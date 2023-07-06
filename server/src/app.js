import express from 'express';
import cookieParser from 'cookie-parser';
import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config);
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', async (req, res) => {
  const data = await db('games').select();
  res.send(data);
});

app.post('/', (req, res) => {
  const { test } = req.body;
  if (test) {
    console.log(test);
    res.sendStatus(200);
  }
  res.sendStatus(400);
});

export default app;
