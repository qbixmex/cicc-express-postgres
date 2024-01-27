import { Request, Response } from 'express';
import { QueryConfig } from 'pg';
import { pool } from "../db/config";

type URL = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date,
  updatedAt: Date | null,
};

const list = async (
  request: Request<{ userId: string }>,
  response: Response
) => {
  const { userId } = request.params;

  const queryResult = await pool.query<URL>(`
    SELECT * FROM urls
    WHERE user_id = $1;
  `, [userId]);

  const urls = queryResult.rows;

  return response.json(urls);
};

const show = async (
  request: Request<{ userId: string, urlId: string }>,
  response: Response
) => {
  const { userId, urlId } = request.params;
  return response.json({
    userId,
    urlId,
    message: 'Should show a URL 👀'
  });
};

const store = async (
  request: Request<{ userId: string }>,
  response: Response
) => {
  const { userId } = request.params;
  return response.json({
    userId,
    message: 'Should store a new URL 💾'
  });
};

const update = async (
  request: Request<{ userId: string, urlId: string }>,
  response: Response
) => {
  const { userId, urlId } = request.params;
  return response.json({
    userId,
    urlId,
    message: 'Should update an URL 💾'
  });
};

const destroy = async (
  request: Request<{ userId: string, urlId: string }>,
  response: Response
) => {
  const { userId, urlId } = request.params;
  return response.json({
    userId,
    urlId,
    message: 'Should delete an URL 🗑️'
  });
};

export default {
  list,
  show,
  store,
  update,
  destroy,
};