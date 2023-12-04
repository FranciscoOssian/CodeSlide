import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { marpCli } from '@marp-team/marp-cli';

const upload = multer();

type ResponseData = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest & { file: any },
  res: NextApiResponse<ResponseData>
) {
  const uploadMiddlewarePromise = new Promise<void>((resolve, reject) => {
    const uploadMiddleware: any = upload.single('file');
    uploadMiddleware(req, res, (err: any) => {
      if (err) {
        console.error('Erro de upload:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });

  await uploadMiddlewarePromise;

  res.setHeader('Content-Disposition', 'attachment; filename=exported.html');
  res.setHeader('Content-Type', 'text/html');

  const tempFilePath = `/tmp/${new Date().getTime()}.md`;
  const outFilePath = `/tmp/${new Date().getTime()}.html`;

  const run = async () => {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }
    const content = req.file.buffer.toString('utf-8');
    await writeFile(tempFilePath, content);
    await marpCli([tempFilePath, '--output', outFilePath, '--html']);
    if (!fs.existsSync(outFilePath)) {
      console.log('Arquivo não encontrado após execução do Marp.');
      return res.status(404).json({ message: 'Arquivo não encontrado após execução do Marp.' });
    }
    fs.createReadStream(outFilePath)
      .pipe(res)
      .on('finish', () => {
        fs.unlinkSync(tempFilePath);
        fs.unlinkSync(outFilePath);
      });
  };

  try {
    if (req.method === 'POST') {
      await run();
    } else {
      return res.status(405).json({ message: 'Método não permitido.' });
    }
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ message: 'Erro ao processar a requisição.' });
  }
}
