import express from 'express';
import { expressjwt } from 'express-jwt';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db('rentals')
    .select('*')
    .then(rentals => {
      res.json(rentals);
    });
});

// Query from db
// all vehicles that are not reserved within pickup and return times at specified location
router.get('/search', async (req, res) => {
  console.log('searching', req.query);
  const location = Number.parseInt(req.query.location);
  let results = await db('tank_inventory')
    .select()
    .whereNotIn('tank_id', queryBuilder => {
      queryBuilder
        .from('rentals')
        .select('tank_id')
        .where('rental_origin', location)
        .andWhere('start_date', '<=', req.query.returnTime)
        .andWhere('end_date', '>=', req.query.pickUpTime);
    })
    .andWhere('location_id', location);
  console.log(results);
  /**
SELECT *
FROM inventory
WHERE vehicle_id NOT IN (
    SELECT vehicle_id
    FROM rentals
    WHERE location_id = <specified_location_id>
    AND (pickup_time <= <specified_return_time> AND return_time >= <specified_pickup_time>)
);
   */
  res.status(200).json(results);
});

router.post(
  '/reservation',
  expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
  }),
  async (req, res, next) => {
    console.log('after auth');
    if (!req.auth.username) return res.sendStatus(401);

    // res.status(200).send(`Welcome, ${req.auth.username}!`);
    // user is authorized. insert into db
    // customer_id -> select user_id from users
    // start_date
    // end_date
    // rental_origin
    // location
    try {
      let user = await db('users')
        .select('id')
        .first()
        .where({ username: req.auth.username });

      let response = await db('rentals').insert(
        {
          tank_id: req.body.tank_id,
          start_date: req.body.pickUpTime,
          end_date: req.body.returnTime,
          rental_origin: req.body.location,
          customer_id: user.id,
        },
        ['contract_id']
      );

      console.log('response: ', response);

      res.status(201).send('Reservation successful');
    } catch (e) {
      res.status(500);
      next(e);
    }
  },
  (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Token was invalid.');
    } else {
      next(err);
    }
  }
);

router.get(
  '/reservation',
  expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
  }),
  async (req, res, next) => {
    console.log('after auth');
    if (!req.auth.username) return res.sendStatus(401);

    try {
      let user = await db('users')
        .select('id')
        .first()
        .where({ username: req.auth.username });

      let response = await fetch();
    } catch (e) {
      res.status(500);
      next(e);
    }
  }
);

export default router;
