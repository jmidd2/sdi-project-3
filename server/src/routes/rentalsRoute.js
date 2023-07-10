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

export default router;
