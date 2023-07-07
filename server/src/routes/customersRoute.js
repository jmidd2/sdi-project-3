import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db('customers')
    .select('*')
    .then(customers => {
      res.json(customers);
    });
});

export default router;
