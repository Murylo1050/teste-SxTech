/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {

    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').unique();
        table.string('hashedPassword');
        table.string('email');
        table.string('country');
        table.string('age');
        table.string('street');
        table.string('avenue');
        table.string('number');
        table.string('tag');
        table.timestamps();
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('users');
}
