import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateInvitationValidator {
  constructor(protected ctx: any) { }

  public schema = schema.create({
    event_id: schema.number([rules.exists({ table: 'events', column: 'id' })]),
    guest_id: schema.number([rules.exists({ table: 'guests', column: 'id' })]),
    description: schema.string({}, [rules.maxLength(1000)]),
  })

  public messages = {
    'event_id.required': 'Event ID is required',
    'event_id.exists': 'Event ID must exist in the events table',
    'guest_id.required': 'Guest ID is required',
    'guest_id.exists': 'Guest ID must exist in the guests table',
    'description.required': 'Description is required',
    'description.maxLength': 'Description cannot exceed 1000 characters',
  }
}
