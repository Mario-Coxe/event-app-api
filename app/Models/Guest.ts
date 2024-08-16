import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import CategoryGuest from './CategoryGuest'
import Table from './Table'
export default class Guest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public categoryguestId: number

  @belongsTo(() => CategoryGuest, {
    foreignKey: 'categoryguestId',
    localKey: 'id'
  })
  public categoryguest: BelongsTo<typeof CategoryGuest>


  @column()
  public tableId: number

  @belongsTo(() => Table, {
    foreignKey: 'tableId',
    localKey: 'id'
  })
  public table: BelongsTo<typeof Table>

  @column()
  public is_actived: boolean | string

  @column()
  public is_deleted: boolean | string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
