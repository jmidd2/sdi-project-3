import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db('tank_inventory')
    .select('*')
    .then(tank_inventory => {
      res.json(tank_inventory);
    });
});

export default router;
