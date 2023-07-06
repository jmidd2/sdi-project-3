import dotenv from 'dotenv';
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  client: 'pg',
  migrations: {
    directory: './migrations',
  },
  connection: {
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    user: process.env.PG_USER || 'Ingwaz',
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE || 'tankvana_db',
  },

  seeds: {
    directory: './seeds'
  }
};

export default config;