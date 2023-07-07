import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db('rentals')
    .select('*')
    .then(rentals => {
      res.json(rentals);
    });
});

export default router;
