import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Category from './Category'
export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime()
  public date_event: DateTime

  @column()
  public userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
    localKey: 'id'
  })
  public user: BelongsTo<typeof User>


  @column()
  public categoryId: number

  @belongsTo(() => Category, {
    foreignKey: 'categoryId',
    localKey: 'id'
  })
  public category: BelongsTo<typeof Category>


  @column()
  public is_actived: boolean | string

  @column()
  public is_deleted: boolean | string

  @column()
  public local: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
