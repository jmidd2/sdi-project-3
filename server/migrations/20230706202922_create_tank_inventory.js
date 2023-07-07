/**
 * @param { import("knex").Knex } knex
 */
export async function up(knex) {
  return knex.schema
    .createTable('locations', table => {
      table.increments('location_id');
      table.string('city');
      table.string('state');
      table.string('country');
    })
    .createTable('customers', table => {
      table.increments('customer_id');
      table.string('name');
      table.integer('tier');
    })
    .createTable('users', table => {
      table.increments('id');
      table
        .integer('customer_id')
        .unsigned()
        .references('customers.customer_id');
      table.string('username');
      table.string('password');
      table.string('issued_jwt_id');
      table.string('issued_jwt_expiration');
    })
    .createTable('tank_inventory', table => {
      table.increments('tank_id');
      table
        .integer('location_id')
        .unsigned()
        .references('locations.location_id');
      table.string('model');
      table.decimal('base_price');
    })
    .createTable('rentals', table => {
      table.increments('contract_id');
      table
        .integer('tank_id')
        .unsigned()
        .unique()
        .references('tank_inventory.tank_id');
      table
        .integer('customer_id')
        .unsigned()
        .references('customers.customer_id');
      table.dateTime('start_date');
      table.datetime('end_date');
      table
        .integer('rental_origin')
        .unsigned()
        .references('locations.location_id');
      table.string('location');
    });
}

/**
 * @param { import("knex").Knex } knex
 */
export async function down(knex) {
  return knex.schema
    .dropTableIfExists('rentals')
    .dropTableIfExists('tank_inventory')
    .dropTableIfExists('users')
    .dropTableIfExists('customers')
    .dropTableIfExists('locations');
}
