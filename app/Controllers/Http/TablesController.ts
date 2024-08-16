import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Table from 'App/Models/Table'
import CreateTableValidator from 'App/Validators/CreateTableValidator'

export default class TablesController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateTableValidator)
    const table = await Table.create(data)
    return response.created({ message: 'Mesa criada com sucesso', table })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const table = await Table.findOrFail(params.id)
    const data = request.only([
      'name',
      'location',
      'description',
      'event_id',
      'is_actived',
      'is_deleted'
    ])
    table.merge(data)
    await table.save()
    return response.ok({ message: 'Mesa atualizada com sucesso', table })
  }

  public async delete({ params, response }: HttpContextContract) {
    const table = await Table.findOrFail(params.id)
    table.is_deleted = true
    await table.save()
    return response.ok({ message: 'Mesa deletada com sucesso' })
  }

  public async findOne({ params, response }: HttpContextContract) {
    const table = await Table.findOrFail(params.id)
    await table.load('event')
    return response.ok({ table })
  }


  public async findAll({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const tables = await Table.query()
      .where('is_deleted', false)
      .preload('event')
      .paginate(page, limit)
    return response.ok({ tables })
  }
}
