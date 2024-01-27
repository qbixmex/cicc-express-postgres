import { Request, Response } from 'express';
import { QueryConfig } from 'pg';
import { client, pool } from "../db/config";

type URL = {
  id: number;
  user_id: string;
  original_url: string;
  short_url: Date;
  counter: number;
  created_at: Date;
  updated_at: Date | null;
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

  const query: QueryConfig = {
    text: `SELECT * FROM urls WHERE urls.id = $1 AND urls.user_id = $2;`,
    values: [urlId, userId]
  };

  const queryResult = await pool.query<URL>(query);
  const url = queryResult.rows[0];

  return response.json(url);
};

type createBodyProps = Pick<URL, 'original_url' | 'short_url'>;

const store = async (
  request: Request<{ userId: string }, {}, createBodyProps>,
  response: Response<URL>
) => {
  const { userId } = request.params;
  const { original_url, short_url } = request.body;

  const query: QueryConfig = {
    text: `INSERT INTO urls (user_id, original_url, short_url)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
    values: [userId, original_url, short_url]
  };

  const queryResult = await pool.query<URL>(query);
  const url = queryResult.rows[0];

  return response.json(url);
};

type updateBodyProps = Pick<URL, 'original_url' | 'short_url'>;

const update = async (
  request: Request<{ userId: string, urlId: string }, {}, updateBodyProps>,
  response: Response<URL>
) => {
  const { userId, urlId } = request.params;
  const { original_url, short_url } = request.body;

  const query: QueryConfig = {
    text: `UPDATE urls
      SET
        user_id = $1,
        original_url = $3,
        short_url = $4,
        updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `,
    values: [userId, urlId, original_url, short_url]
  };

  const queryResult = await pool.query<URL>(query);
  const url = queryResult.rows[0];

  return response.json(url);
};

const destroy = async (
  request: Request<{ userId: string, urlId: string }>,
  response: Response<{ id: string } | { error: string }>
) => {
  const { userId, urlId } = request.params;

  await client.query("BEGIN");

  const query: QueryConfig = {
    text: `DELETE FROM urls
      WHERE user_id = $1 AND id = $2
      RETURNING id;
    `,
    values: [userId, urlId]
  };

  const queryResponse = await client.query(query);

  if (queryResponse.rowCount === 0) {
    await client.query("ROLLBACK");
    return response.status(500).json({ error: "Something went wrong 🥺❗️" });
  }

  if (queryResponse.rows[0].id.toString() === urlId && queryResponse.rowCount === 1) {
    await client.query("COMMIT");
    return response.json(queryResponse.rows[0]);
  }
};

export default {
  list,
  show,
  store,
  update,
  destroy,
};