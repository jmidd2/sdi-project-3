import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db('locations')
    .select('*')
    .then(locations => {
      res.json(locations);
    });
});

export default router;
