import express from 'express';
import cookieParser from 'cookie-parser';
import knex from 'knex';
import config from '../knexfile.js';

const db = knex(config);
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', async (req, res) => {
  const data = await db('test').select();
  res.send(data);
});

app.post('/', (req, res) => {
  const { test } = req.body;
  if (test) {
    console.log(test);
    res.sendStatus(200);
  }
  res.sendStatus(400);
});
/*
app.get('/tank_inventory', (req, res) => {
  db('tank_inventory')
    .select('*')
    .then(tankvana_inventory => {
      res.json(tankvana_inventory);
    });
});

app.get('/rentals', (req, res) => {
  db('rentals')
    .select('*')
    .then(rentals => {
      res.json(rentals);
    });
});

app.get('/customers', (req, res) => {
  db('customers')
    .select('*')
    .then(customers => {
      res.json(customers);
    });
});

app.get('/vehicle_loadouts', (req, res) => {
  db('vehicle_loadouts')
    .select('*')
    // Since we will have so many routes I like to seperate them into files
    .then(vehicle_loadouts => {
      res.json(vehicle_loadouts);
    });
});

app.get('/weapon_inventory', (req, res) => {
  db('locations')
    .select('*')
    .then(locations => {
      res.json(locations);
    });
});

app.get('/locations', (req, res) => {
  db('locations')
    .select('*')
    .then(locations => {
      res.json(locations);
    });
});
*/
// app.get('/weapon_inventory', (req, res) => {
//   knex
//     .select('*')
//     .from('weapon_inventory')
//     .join(
//       'weapon_inventory',
//       'vehicle_loadouts.loadout_id',
//       '=',
//       'inventory_id.id'
//     )
// .then(data => {
//     //   res.json(data);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ message: 'An error occurred' });
//     });
// });

export default app;
