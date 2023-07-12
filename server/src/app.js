import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import db from './db.js';
import { rentalRouter, locationRouter, userRouter } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/rentals', rentalRouter);
app.use('/locations', locationRouter);

app.get('/', async (req, res) => {
  const data = await db('users').select();
  res.send(data);
});

export default app;
