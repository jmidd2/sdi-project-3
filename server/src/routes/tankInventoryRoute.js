import express from 'express';
import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config);
const router = express.Router();

router.get('/', (req, res) => {
  db('tank_inventory')
    .select('*')
    .then(tank_inventory => {
      res.json(tank_inventory);
    });
});

export default router;
