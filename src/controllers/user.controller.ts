import { Request, Response } from 'express';
import { QueryConfig } from 'pg';
import { client, pool } from "../db/config";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date | null;
};

const list = async (_request: Request, response: Response) => {
  const queryResult = await pool.query<User>('SELECT * FROM users ORDER BY id;');

  const users = queryResult.rows;

  return response.json(users);
};

const show = async (
  request: Request<{ userId: string }>,
  response: Response<User>
) => {
  const { userId } = request.params;

  const query: QueryConfig = {
    text: `SELECT * FROM users WHERE id = $1;`,
    values: [userId]
  };

  const queryResult = await pool.query<User>(query);
  const url = queryResult.rows[0];

  return response.json(url);
};

type createBodyProps = Pick<User, 'name' | 'email' | 'password'>;

const store = async (
  request: Request<{}, {}, createBodyProps>,
  response: Response<User>
) => {
  const { name, email, password } = request.body;

  const query: QueryConfig = {
    text: `INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
    values: [name, email, password]
  };

  const queryResult = await pool.query<User>(query);
  const user = queryResult.rows[0];

  return response.json(user);
};

type updateBodyProps = Pick<User, 'name' | 'email' | 'password'>;

const update = async (
  request: Request<{ userId: string }, {}, updateBodyProps>,
  response: Response<User>
) => {
  const { userId } = request.params;
  const { name, email, password } = request.body;

  const query: QueryConfig = {
    text: `UPDATE users
      SET
        name = $2,
        email = $3,
        password = $4,
        updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `,
    values: [userId, name, email, password]
  };

  const queryResult = await pool.query<User>(query);
  const user = queryResult.rows[0];

  return response.json(user);
};

const destroy = async (
  request: Request<{ userId: string }>,
  response: Response<{ id: string } | { error: string }>
) => {
  const { userId } = request.params;

  await client.query("BEGIN");

  const query: QueryConfig = {
    text: `DELETE FROM users WHERE id = $1 RETURNING id;`,
    values: [userId]
  };

  const queryResponse = await client.query(query);

  if (queryResponse.rowCount === 0) {
    await client.query("ROLLBACK");
    return response.status(500).json({ error: "Something went wrong 🥺❗️" });
  }

  await client.query("COMMIT");
  return response.json(queryResponse.rows[0]);
};

export default {
  list,
  show,
  store,
  update,
  destroy,
};