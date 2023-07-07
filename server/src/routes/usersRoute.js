import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import 'dotenv/config';
import db from '../db.js';

const router = express.Router();

const generateAccessToken = (username, email) => {
  let admin = username === 'Jon M';
  return jwt.sign(
    { username, email, permissions: { admin } },
    process.env.TOKEN_SECRET,
    {
      issuer: 'https://test.jmidd.dev', // where was the JWT issued
      subject: email, // the user of the JWT
      audience: `${username} at test.jmidd.dev`, // the intended recipient of the JWT
      expiresIn: 1800,
      jwtid: uuid(), // UUID of the JWT
    }
  );
};

router.get('/', async (req, res, next) => {
  try {
    let users = await db('users').select();
    res.send(users);
  } catch (e) {
    res.status(500);
    next(e);
  }
});

export default router;
