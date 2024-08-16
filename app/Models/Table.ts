import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'

export default class Table extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public location: string

  @column()
  public description: string

  @column()
  public eventId: number
  
  @belongsTo(() => Event, {
    foreignKey: 'eventId',
    localKey: 'id'
  })
  public event: BelongsTo<typeof Event>


  @column()
  public is_actived: boolean | string

  @column()
  public is_deleted: boolean | string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
