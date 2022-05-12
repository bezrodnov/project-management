import { NextApiHandler } from 'next';

import axios from 'axios';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const proxy =
  ({ baseURL = process.env.API_BASE_URL, methods }: { baseURL?: string; methods: string[] }): NextApiHandler =>
  (req, res) => {
    if (!req.method || !methods.includes(req.method)) {
      res.status(404);
      return;
    }

    const url = req.url?.substring('/api/'.length);

    const token = req.cookies['auth-token'];
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    return axios(`${baseURL}/${url}`, {
      method: req.method,
      data: req.body,
      headers,
    })
      .then(async (response) => {
        res.status(response.status);

        Object.entries(response.headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });

        const data = response.data;
        if (data.token) {
          res.setHeader('Set-Cookie', `auth-token=${data.token}; Max-Age=${60 * 60 * 24 * 2}; path=/; HttpOnly`);
        }
        res.send(data.token ? {} : data);
      })
      .catch((e) => {
        console.error(e);
        res.status(500);
        res.end();
      });
  };

export { proxy };
