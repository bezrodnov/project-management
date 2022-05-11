import { NextApiHandler } from 'next';

const handler: NextApiHandler = (_req, res) => {
  res.setHeader('Set-Cookie', `token=; Max-Age=-1; path=/; HttpOnly`);
  res.status(200);
  res.end();
};

export default handler;
