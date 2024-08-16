import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tables'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('location', 255).notNullable()
      table.string('description', 255).nullable()
      table.integer('event_id').unsigned().references('id').inTable('events').onDelete('CASCADE')
      table.string('is_actived').notNullable().defaultTo('true')
      table.string('is_deleted').notNullable().defaultTo('false')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
