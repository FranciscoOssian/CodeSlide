import { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import fetch from 'node-fetch';
import stream from 'stream';

import { uploadMiddlewarePromise, setHeaders, ResponseData } from './export';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest & { file: any },
  res: NextApiResponse<ResponseData>
) {
  await uploadMiddlewarePromise(req, res);

  setHeaders(res);

  const run = async () => {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }
    const content = req.file.buffer.toString('utf-8');

    const formData = new FormData();
    formData.append('file', Buffer.from(content), { filename: 'filename.md' });

    try {
      // see ./exports.ts to understand this uri
      const response = await fetch('https://serverteste-code-slide.onrender.com/api/export', {
        method: 'POST',
        body: formData,
        headers: {
          ...formData.getHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Create a readable stream from the buffer
      const readableStream = new stream.Readable();
      readableStream.push(buffer);
      readableStream.push(null);

      readableStream.pipe(res);
    } catch (error) {
      console.error('Erro:', error);
      return res.status(500).json({ message: 'Erro ao processar a requisição.' });
    }
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
