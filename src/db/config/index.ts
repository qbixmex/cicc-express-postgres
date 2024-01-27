import dotenv from 'dotenv';
import { Pool, PoolConfig } from "pg";

dotenv.config();

const poolConfig: PoolConfig = {
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ?? undefined,
};

export const pool = new Pool(poolConfig);
