import express from 'express';
import multer from 'multer';
import db from '../db.js';

const router = express.Router();

const upload = multer();

router.get('/', (req, res) => {
  db('rentals')
    .select('*')
    .then(rentals => {
      res.json(rentals);
    });
});

// Receiving somehow
// location id
// pickup time/date
// return time/date
// vehicle level

// Query from db
// all vehicles that are not reserved within pickup and return times at specified location
router.get('/search', upload.none(), async (req, res) => {
  // let data = await req.body;
  // console.log(body);
  // let results = [];+
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

  // console.log(results);
  // let utc = Date.parse(req.query.pickUpTime);
  // console.log('pickup', utc);
  // let date = new Date(utc);
  // console.log(date);
  res.status(200).json(results);
});

export default router;
