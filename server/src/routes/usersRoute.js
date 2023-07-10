import express from 'express';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import { v4 as uuid, validate as validateUuid } from 'uuid';
import db from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

/**
 *
 * @param {*} username
 * @param {*} genUuid
 * @param {*} prevUuid
 * @returns { token: JWT, jwtid: UUID}
 */
const generateAccessToken = (username, genUuid = true, prevUuid) => {
  let admin = username === 'Jon M';
  let tokenUuid = genUuid ? uuid() : prevUuid;
  return {
    token: jwt.sign(
      { username, permissions: { admin } },
      process.env.TOKEN_SECRET,
      {
        issuer: 'tankvana', // where was the JWT issued
        subject: username, // the user of the JWT
        audience: `${username} at tankvana`, // the intended recipient of the JWT
        expiresIn: 1800,
        jwtid: tokenUuid, // UUID of the JWT
      }
    ),
    jwtid: tokenUuid,
  };
};

const pwHash = pw => {
  return bcrypt.hashSync(pw, 10);
};

// :3001/users/
router.get('/', async (req, res, next) => {
  try {
    let users = await db('users').select();
    let token = generateAccessToken('Jon M');
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
router.post('/signup', async (req, res) => {
  let newUser =
    (await db('users').select('*').where({ username: req.body.un })).length ===
    0;
  console.log(newUser);
  if (newUser) {
    let { token, jwtid } = generateAccessToken(req.body.un);
    //db call to insert username and id...
    let hash = pwHash(req.body.pw);
    console.log('hash ', hash);
    console.log('token ', token);
    // bcrypt.hash(req.body.pw, 10, async (err, hash) => {
    // await db('users').insert({
    //   username: req.body.un,
    //   password: hash,
    //   issued_jwt_id: jwtid,
    //   issued_jwt_expiration: '',
    //   // });
    // });
    res.status(201).json(token);
  } else {
    res.status(401).json(null);
  }
});

// 3001/users/signin
// - post
// check db for user
// check password
// verify jwtid
// send token
router.post('/signin', async (req, res) => {
  //req.body.pw
  //req.body.un
  let user = await db('users').where({ username: req.body.un }).first();
  console.log(user);
  if (user === undefined) {
    res.status(404).json('Incorrect username');
  } else {
    bcrypt.compare(req.body.pw, user.password, async (err, valid) => {
      if (valid) {
        let token, jwtid;
        if (user.issued_jwt_id && validateUuid(user.issued_jwt_id)) {
          ({ token } = generateAccessToken(
            req.body.un,
            false,
            user.issued_jwt_id
          ));
        } else {
          ({ token, jwtid } = generateAccessToken(req.body.un));
          await db('users').where({id: user.id}).update({issued_jwt_id: jwtid});
        }
        res.status(200).json(token);
      } else {
        res.status(401).json('Incorrect password');
      }
    });
  }
});

router.get(
  '/protected',
  expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
  }),
  function (req, res) {
    console.log('after auth');
    if (!req.auth.username) return res.sendStatus(401);

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
