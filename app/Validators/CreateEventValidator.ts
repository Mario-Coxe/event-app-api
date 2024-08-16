import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEventValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required(), rules.maxLength(255)]),
    local: schema.string({}, [rules.required(), rules.maxLength(255)]),
    date_event: schema.date({}, [rules.required()]),
    is_actived: schema.boolean.optional(),
    is_deleted: schema.boolean.optional(),
    user_id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
    category_id: schema.number([rules.exists({ table: 'categories', column: 'id' })]),
    description: schema.string({}, [rules.required(), rules.maxLength(500)]),
  })

  public messages: CustomMessages = {
    'name.required': 'O nome do evento é obrigatório.',
    'local.required': 'O local do evento é obrigatório.',
    'date_event.required': 'A data do evento é obrigatória.',
    'user_id.required': 'O ID do usuário é obrigatório.',
    'category_id.required': 'O ID da categoria é obrigatório.',
    'description.required': 'A descrição do evento é obrigatória.',
  }
}
