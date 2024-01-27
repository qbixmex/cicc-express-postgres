import express from 'express';
import dotenv from 'dotenv';
import rootRoutes from './routes/root.routes';
import urlRoutes from './routes/url.routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', rootRoutes);
app.use('/api/v1', urlRoutes);

export default app;
