import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class extends BaseSchema {
  protected tableName = 'invitations'

  public async up() {
    const tableExists = await this.schema.hasTable(this.tableName)
    if (!tableExists) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.integer('event_id').unsigned().references('id').inTable('events').onDelete('CASCADE')
        table.integer('guest_id').unsigned().references('id').inTable('guests').onDelete('CASCADE')
        table.string('description').notNullable()
        table.boolean('is_actived').notNullable().defaultTo(true)
        table.boolean('is_deleted').notNullable().defaultTo(false)
        table.timestamps(true, true)
      })
    }
  }

  public async down() {
    const tableExists = await this.schema.hasTable(this.tableName)
    if (tableExists) {
      this.schema.dropTable(this.tableName)
    }
  }
}
