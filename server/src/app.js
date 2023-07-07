import express from 'express';
import cookieParser from 'cookie-parser';
import knex from 'knex';
import config from '../knexfile.js';
import {
  tankInventoryRouter,
  rentalRouter,
  customerRouter,
  locationRouter,
  userRouter,
} from './routes/index.js';

const db = knex(config);
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/tank-inventory', tankInventoryRouter);
app.use('/rentals', rentalRouter);
app.use('/customers', customerRouter);
app.use('/locations', locationRouter);
app.use('/user', userRouter);
// app.use('vehicle-loadouts');
// app.use('weapon-inventory');

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

// // app.get('/weapon_inventory', (req, res) => {
// //   db('locations')
// //     .select('*')
// //     .then(locations => {
// //       res.json(locations);
// //     });
// // });


// // app.get('/weapon_inventory', (req, res) => {
// //   knex
// //     .select('*')
// //     .from('weapon_inventory')
// //     .join(
// //       'weapon_inventory',
// //       'vehicle_loadouts.loadout_id',
// //       '=',
// //       'inventory_id.id'
// //     )
// // .then(data => {
// //     //   res.json(data);
// //     })
// //     .catch(err => {
// //       console.error(err);
// //       res.status(500).json({ message: 'An error occurred' });
// //     });
// // });

export default app;
