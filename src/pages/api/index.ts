import { NextApiHandler, NextApiRequest } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

import axios, { AxiosError, Method } from 'axios';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BASE_URL = process.env.API_BASE_URL;

const doRequest = (
  url: string,
  {
    baseURL = BASE_URL,
    method = 'GET',
    data,
    cookies,
  }: {
    baseURL?: string;
    method?: string;
    data?: unknown;
    cookies: NextApiRequestCookies;
  }
) => {
  const token = cookies['auth-token'];
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const parsedURL = `${baseURL}/${url.replace('/api/', '')}`;
  console.log({ parsedURL, headers, method, data });
  return axios(parsedURL, { method, data, headers });
};

const proxy =
  ({ baseURL = BASE_URL, methods }: { baseURL?: string; methods: string[] }): NextApiHandler =>
  (req, res) => {
    const { method, url, cookies, body: data } = req;
    if (!url || !method || !methods.includes(method)) {
      res.status(404).end();
      return;
    }

    return doRequest(url, { baseURL, method, cookies, data })
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
        if (e instanceof AxiosError) {
          res.status(e.response?.status ?? 500).send(e.response?.data);
          return;
        }
        res.status(500);
        res.end();
      });
  };

export { proxy, doRequest };
