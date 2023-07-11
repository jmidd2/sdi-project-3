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
      model: 'M1A1',
      base_price: 10000000.0,
    },

    {
      tank_id: 2,
      location_id: 2,
      model: 'M1A1',
      base_price: 10000000.0,
    },

    {
      tank_id: 3, 
      location_id: 3, 
      model: 'Power Wheels',
      base_price: 500.0, 

    },

    {
      tank_id: 4, 
      location_id: 3, 
      model: 'Power Wheels',
      base_price: 500.0, 

    },

    {
      tank_id: 5, 
      location_id: 4,
      model: 'M46A3 Ravager', 
      base_price: 1000000000.0,
    },

    {
      tank_id: 6, 
      location_id: 1,
      model: 'M46A3 Ravager', 
      base_price: 1000000000.0,
    },

    {
      tank_id: 7,
      location_id: 3,
      model: 'M1A1',
      base_price: 10000000.0,
    },

    {
      tank_id: 8,
      location_id: 3,
      model: 'M1A1',
      base_price: 10000000.0,
    },

    {
      tank_id: 9,
      location_id: 4,
      model: 'M1A1',
      base_price: 10000000.0,
    },

    {
      tank_id: 10,
      location_id: 1,
      model: 'M1A1',
      base_price: 10000000.0,
    },

    {
      tank_id: 11,
      location_id: 2,
      model: 'M1A1',
      base_price: 10000000.0,
    },

  ]);
};

export default seed;
