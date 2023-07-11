/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('customers').del();
  await knex('customers').insert([
    {
      customer_id: 1,
      name: 'Ivan',
      tier: 1,

    },

    {
      customer_id: 2,
      name: 'Nataliya',
      tier: 2,

    },

    {
      customer_id: 3,
      name: 'Vladimir',
      tier: 0,

    },

    {
      customer_id: 4,
      name: 'Khabib Nurmagomedov',
      tier: 2,

    },

  ]);
};

export default seed;
