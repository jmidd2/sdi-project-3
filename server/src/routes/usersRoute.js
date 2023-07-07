import express from 'express';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

const router = express.Router();

const generateAccessToken = (username, email) => {
  let admin = username === 'Jon M';
  return jwt.sign(
    { username, email, permissions: { admin } },
    process.env.TOKEN_SECRET,
    {
      issuer: 'tankvana', // where was the JWT issued
      subject: email, // the user of the JWT
      audience: `${username} at tankvana`, // the intended recipient of the JWT
      expiresIn: 1800,
      jwtid: uuid(), // UUID of the JWT
    }
  );
};

// :3001/users/
router.get('/', async (req, res, next) => {
  try {
    let users = await db('users').select();
    let token = generateAccessToken('Jon M', 'some@email.com');
    res.send(token);
  } catch (e) {
    res.status(500);
    next(e);
  }
});

// signup
//  - post
//  check db for username
//  insert new user
//  generate token
//  respond with token

// signin

router.get(
  '/protected',
  expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
  }),
  function (req, res) {
    console.log('after auth');
    if (!req.auth.permissions.admin) return res.sendStatus(401);

    res.status(200).send(`Welcome, ${req.auth.username}!`);
  },
  (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Token was invalid.');
    } else {
      next(err);
    }
  }
);

export default router;
