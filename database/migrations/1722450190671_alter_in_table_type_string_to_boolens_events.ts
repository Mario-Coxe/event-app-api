import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterIsActivedAndIsDeletedTypesInguests extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    // Primeiro, remover as colunas antigas
    await this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_actived')
      table.dropColumn('is_deleted')
    })

    await this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_actived').notNullable().defaultTo(true).after('date_event')
      table.boolean('is_deleted').notNullable().defaultTo(false).after('date_event')
    })
  }

  public async down() {
    await this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_actived')
      table.dropColumn('is_deleted')

        table.string('is_actived').notNullable().defaultTo('true')
      table.string('is_deleted').notNullable().defaultTo('false')
    })
  }
}
