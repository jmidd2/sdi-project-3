/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('rentals').del();
  await knex('rentals').insert([
    {
      contract_id: 1,
      tank_id: 1,
      customer_id: 1,
      start_date: '2023-07-01',
      end_date: '2023-07-06',
      rental_origin: 1,
      location: 'Ukraine',
    },

    {
      contract_id: 2,
      tank_id: 2,
      customer_id: 2,
      start_date: '2023-07-01',
      end_date: '2023-07-06',
      rental_origin: 2,
      location: 'Ukraine',
    },

    {
      contract_id: 3,
      tank_id: 3,
      customer_id: 3,
      start_date: '2023-07-01',
      end_date: '2023-07-06',
      rental_origin: 3,
      location: 'Ukraine',
    },

    {
      contract_id: 4,
      tank_id: 4,
      customer_id: 4,
      start_date: '2023-07-01',
      end_date: '2023-07-06',
      rental_origin: 4,
      location: 'Ukraine',
    },
  ]);
};

export default seed;
