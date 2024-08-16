import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterIsActivedAndIsDeletedTypesInguests extends BaseSchema {
  protected tableName = 'guests'

  public async up() {
    // Primeiro, remover as colunas antigas
    await this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_actived')
      table.dropColumn('is_deleted')
    })

    // Em seguida, adicionar as colunas novamente como boolean
    await this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_actived').notNullable().defaultTo(true)
      table.boolean('is_deleted').notNullable().defaultTo(false)
    })
  }

  public async down() {
    // Reverter as mudanças feitas no método up
    await this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_actived')
      table.dropColumn('is_deleted')
      table.string('is_actived').notNullable().defaultTo('true')
      table.string('is_deleted').notNullable().defaultTo('false')
    })
  }
}
