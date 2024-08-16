import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCategoryValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'categories', column: 'name' })
    ]),
    description: schema.string({}, [rules.required()])
  })

  public messages: CustomMessages = {
    'name.required': 'O nome é obrigatório.',
    'name.unique': 'O nome deve ser único.',
    'description.required': 'A descrição é obrigatória.'
  }
}
