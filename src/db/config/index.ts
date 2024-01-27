import dotenv from 'dotenv';
import { Client, ClientConfig, Pool, PoolConfig } from "pg";

dotenv.config();

const poolConfig: PoolConfig = {
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ?? undefined,
};

export const pool = new Pool(poolConfig);

const clientConfig: ClientConfig = {
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ?? undefined,
};

export const client = new Client(clientConfig);

client
  .connect()
  .then(() => {
    console.log("Client connected to database successfully 👍🎉");
  })
  .catch(() => {
    console.log(
      "Something went wrong while connecting database with postgres client 🥺❗️"
    );
  });
