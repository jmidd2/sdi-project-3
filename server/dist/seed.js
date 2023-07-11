import knex from 'knex';
import config from '../knexfile.js';

const knexDb = knex(config);
// await knexDb('reviews').del();
// await knexDb('games').del();
// await knexDb('publishers').del();
// await knexDb('genres').del();
// // await knexDb('authors').del();
// await knexDb.seed.run({ specific: 'authors.js' });
// await knexDb.seed.run({ specific: 'genres.js' });
// await knexDb.seed.run({ specific: 'publishers.js' });
// await knexDb.seed.run({ specific: 'games.js' });
// await knexDb.seed.run({ specific: 'reviews.js' });
await knexDb.seed.run({ directory: './seeds' });
await knexDb.destroy();
