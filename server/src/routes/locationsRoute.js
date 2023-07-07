import express from 'express';
import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config);
const router = express.Router();

router.get('/', (req, res) => {
  db('locations')
    .select('*')
    .then(locations => {
      res.json(locations);
    });
});

export default router;
