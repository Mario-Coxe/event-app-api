import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateGuest {
  public schema = schema.create({
    name: schema.string({}, [
      rules.maxLength(255),
      rules.trim()
    ]),
    phone: schema.string({}, [
      rules.mobile()
    ]),
    email: schema.string.optional({}, [
      rules.email(),
      rules.maxLength(255)
    ]),
    categoryguest_id: schema.number([
      rules.exists({ table: 'category_guests', column: 'id' })
    ]),
    table_id: schema.number.optional([
      rules.exists({ table: 'tables', column: 'id' })
    ]),
    is_actived: schema.boolean.optional(),
    is_deleted: schema.boolean.optional(),
    present: schema.boolean.optional(),
  })

  public messages = {
    'name.required': 'O nome é obrigatório',
    'name.maxLength': 'O nome não pode ter mais que 255 caracteres',
    'phone.required': 'O telefone é obrigatório',
    'phone.mobile': 'O telefone deve ser válido',
    'email.email': 'O email deve ser válido',
    'email.maxLength': 'O email não pode ter mais que 255 caracteres',
    'categoryguest_id.required': 'A categoria é obrigatória',
    'categoryguest_id.exists': 'A categoria deve existir',
    'table_id.exists': 'A mesa deve existir',
  }
}
