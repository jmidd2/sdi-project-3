/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('locations').del();
  await knex('locations').insert([
    {
      location_id: 1,
      city: 'Kyiv',
      state: '',
      country: 'Ukraine',
    },
    {
      location_id: 2,
      city: 'Kharkiv',
      state: '',
      country: 'Ukraine',
    },

    {
      location_id: 3,
      city: 'Odessa',
      state: '',
      country: 'Ukraine',
    },

    {
      location_id: 4,
      city: 'Kherson',
      state: '',
      country: 'Ukraine',
    },
  ]);
};

export default seed;
