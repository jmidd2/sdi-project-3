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
    if (!req.auth.username) return res.sendStatus(401);

    try {
      let user = await db('users')
        .select('id')
        .first()
        .where({ username: req.auth.username });

      let response = await db('rentals')
        .select('*')
        .where({ customer_id: user.id })
        .join(
          'locations',
          'rentals.rental_origin',
          '=',
          'locations.location_id'
        )
        .join(
          'tank_inventory',
          'rentals.tank_id',
          '=',
          'tank_inventory.tank_id'
        )
        .orderBy('contract_id');

      res.send(response);
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

router.put(
  '/reservation/:id',
  expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
  }),
  async (req, res, next) => {
    if (!req.auth.username) return res.sendStatus(401);

    try {
      // By reservation id
      // find fields that have data
      // and update db record respectively
      await db('rentals')
        .where('contract_id', req.body.contractId)
        .update({ start_date: req.body.startDate, end_date: req.body.endDate });

      res.status(200).send(`patching ${req.params.id}`);
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

router.delete(
  '/reservation/:id',
  expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
  }),
  async (req, res, next) => {
    if (!req.auth.username) return res.sendStatus(401);

    try {
      await db('rentals').where('contract_id', req.params.id).delete();

      // By reservation id
      // delete db record

      res.status(200).json(`deleted ${req.params.id}`);
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

export default router;
