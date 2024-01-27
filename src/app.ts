import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_request: Request, response: Response) => {
  response.send('Root Route is Working Fine 👍');
});

export default app;
