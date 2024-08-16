import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'guests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('phone').notNullable()
      table.string('email').nullable()
      table.integer('categoryguest_id').unsigned().references('id').inTable('category_guests').onDelete('CASCADE')
      table.string('is_actived').notNullable().defaultTo('true')
      table.string('is_deleted').notNullable().defaultTo('false')
      table.boolean('present').notNullable().defaultTo('false')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
