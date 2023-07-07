import express from 'express';
import db from '../db.js';

const router = express.Router();

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
