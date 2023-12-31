import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { marpCli } from '@marp-team/marp-cli';

/*
  Note:
        this endpoint receives markdown and returns the html file,
        for this the server needs to call the marpCli module,
        but this module did not work when tested on
        vercel's Serverless Functions environment.
        So as an adjustment (workaround),
        the same repository was cloned and executed within a server in on render,
        thus being able to execute CLI commands.
        In the future, the idea is to build an exclusive server for using marpCli
        and perhaps other commands, and call this server within an Api of this project.
        Maybe what I'm saying has already changed because I'm thinking of ways (which are still workarounds)
        to improve security even with this architecture.
*/

const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export type ResponseData = {
  message?: string;
  blob?: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export const uploadMiddlewarePromise = (
  req: NextApiRequest & { file: any },
  res: NextApiResponse<ResponseData>
) =>
  new Promise<void>((resolve, reject) => {
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

export const setHeaders = (res: NextApiResponse<ResponseData>) => {
  res.setHeader('Content-Disposition', 'attachment; filename=exported.html');
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
};

export default async function handlerWrapper(
  req: NextApiRequest & { file: any },
  res: NextApiResponse<ResponseData>
) {
  await uploadMiddlewarePromise(req, res);

  setHeaders(res);

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
