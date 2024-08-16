import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateTableValidator {
  public schema = schema.create({
    name: schema.string({}, [
      rules.maxLength(255),
      rules.trim()
    ]),
    location: schema.string({}, [
      rules.maxLength(255),
      rules.trim()
    ]),
    description: schema.string.optional({}, [
      rules.maxLength(255),
      rules.trim()
    ]),
    event_id: schema.number([
      rules.exists({ table: 'events', column: 'id' })
    ]),
    is_actived: schema.boolean.optional(),
    is_deleted: schema.boolean.optional(),
  })

  public messages = {
    'name.required': 'O nome é obrigatório',
    'name.maxLength': 'O nome não pode ter mais que 255 caracteres',
    'location.required': 'A localização é obrigatória',
    'location.maxLength': 'A localização não pode ter mais que 255 caracteres',
    'description.maxLength': 'A descrição não pode ter mais que 255 caracteres',
    'event_id.required': 'O ID do evento é obrigatório',
    'event_id.exists': 'O evento deve existir',
  }
}
