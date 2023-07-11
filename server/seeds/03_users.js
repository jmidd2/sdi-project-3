import bcrypt from 'bcrypt';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const pwHash = pw => {
  return bcrypt.hashSync(pw, 10);
};

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      customer_id: 1,
      username: 'Anna',
      password: pwHash('slavaukraini'), // TODO: add bcrypt
    },

    {
      id: 2,
      customer_id: 2,
      username: 'Vasyl',
      password: pwHash('slavaukraini'),
    },

    {
      id: 3,
      customer_id: 3,
      username: 'George St-Pierre',
      password: pwHash('#UFC_GOAT'),
    },

    {
      id: 4,
      customer_id: 4,
      username: 'Connor McGregor',
      password: pwHash('#Notorious'),
    },

    {
      id: 5,
      customer_id: 2,
      username: 'Michael Chandler',
      password: pwHash('#Iron'),
    },

    {
      id: 6,
      customer_id: 3,
      username: 'kevin',
      password: pwHash('test'),
    },
  ]);
};

export default seed;
