#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'node:http';
import app from './app.js';

/**
 * Get port from environment and store in Express.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  const { address } = server.address();
  const host =
    address === '::' || address === '127.0.0.1' ? 'localhost' : address;

  console.log(`Server listening at http://${host}:${port}`);
});

process.on('SIGTERM', () => {
  console.debug('SIGTERM signal received: closing HTTP server...');
  server.close(() => {
    console.debug('HTTP server closed.');
  });
});

app.get('/tank_inventory', (req, res) => {
  knex('tank_inventory')
      .select('*')
      .then(tankvana_inventory => {
          res.json(tankvana_inventory); 
      })
})

app.get('/rentals', (req, res) => {
  knex('rentals')
      .select('*')
      .then(rentals => {
          res.json(rentals); 
      })
})

app.get('/customers', (req, res) => {
  knex('customers')
      .select('*')
      .then(customers => {
          res.json(customers); 
      })
})

app.get('/vehicle_loadouts', (req, res) => {
  knex('vehicle_loadouts')
      .select('*')
      .then(vehicle_loadouts => {
          res.json(vehicle_loadouts); 
      })
})

app.get('/weapon_inventory', (req, res) => {
  knex('locations')
      .select('*')
      .then(locations => {
          res.json(locations); 
      })
})

app.get('/locations', (req, res) => {
  knex('locations')
      .select('*')
      .then(locations => {
          res.json(locations); 
      })
})

app.get('/weapon_inventory', (req, res) => {
  knex.select('*')
      .from('weapon_inventory')
      .join('weapon_inventory', 'vehicle_loadouts.loadout_id', '=', 'inventory_id.id')
      .then(data => {
          res.json(data);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'An error occurred' });
      });
});