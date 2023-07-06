/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('tank_inventory').del();
  await knex('tank_inventory').insert([
    {
      tank_id: 1,
      location_id: 1,
      model: '',
      base_price: 10.0,
    },
  ]);
};

export default seed;
