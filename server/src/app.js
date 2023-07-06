import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
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
