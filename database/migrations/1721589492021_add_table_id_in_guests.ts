import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'guests'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('table_id').unsigned().references('id').inTable('tables').onDelete('CASCADE').nullable().after('categoryguest_id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('table_id')
    })
  }
}
