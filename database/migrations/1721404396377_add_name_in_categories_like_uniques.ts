import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUniqueConstraintToCategories extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['name'])
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['name'])
    })
  }
}
