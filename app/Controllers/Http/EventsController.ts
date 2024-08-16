import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class EventsController {
  public async create({ request, response, auth }: HttpContextContract) {

    const user = auth.user?.id!
    const validationSchema = schema.create({
      name: schema.string({}, [rules.maxLength(255)]),
      local: schema.string({}, [rules.maxLength(255)]),
      date_event: schema.date({}, [rules.required()]),
      category_id: schema.number([rules.required(), rules.exists({ table: 'categories', column: 'id' })]),
      description: schema.string({}, [rules.maxLength(1000)]),
    })

    const validatedData = await request.validate({ schema: validationSchema })

    const eventData = {
      ...validatedData,
      user_id: user,
    }

    const event = await Event.create(eventData)

    return response.created({ message: 'Evento criado com sucesso', event })
  }


  public async findAll({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const events = await Event.query().where('is_deleted', false).preload('category').preload('user').paginate(page, limit)
    return response.ok(events)
  }

  public async findOne({ params, response }: HttpContextContract) {
    const event = await Event.findOrFail(params.id)
    await event.load('category')
    await event.load('user')
    return response.ok(event)
  }


  public async update({ params, request, response }: HttpContextContract) {
    const event = await Event.findOrFail(params.id)
    const data = request.only(['name', 'local', 'date_event', 'is_actived', 'is_deleted', 'user_id', 'category_id', 'description'])
    event.merge(data)
    await event.save()
    return response.ok({ message: 'Evento atualizado com sucesso', event })
  }

  public async delete({ params, response }: HttpContextContract) {
    const event = await Event.findOrFail(params.id)
    event.is_deleted = true
    await event.save()
    return response.ok({ message: 'Evento deletado com sucesso' })
  }
}
