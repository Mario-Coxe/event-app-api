import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Guest from './Guest'

export default class Invitation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public eventId: number

  @belongsTo(() => Event, {
    foreignKey: 'eventId',
    localKey: 'id'
  })
  public event: BelongsTo<typeof Event>

  @column()
  public guestId: number
  @belongsTo(() => Guest, {
    foreignKey: 'guestId',
    localKey: 'id'
  })
  public guest: BelongsTo<typeof Guest>

  @column()
  public description: string

  @column()
  public is_actived: boolean | string

  @column()
  public is_deleted: boolean | string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
