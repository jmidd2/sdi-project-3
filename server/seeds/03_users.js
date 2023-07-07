/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      customer_id: 1,
      username: 'Anna',
      password: 'slavaukraini', // TODO: add bcrypt
    },

    {
      id: 2,
      customer_id: 2,
      username: 'Anna',
      password: 'slavaukraini',
    },
  ]);
};

export default seed;
