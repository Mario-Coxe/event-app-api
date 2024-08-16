import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Guest from 'App/Models/Guest'
import CreateGuestValidator from 'App/Validators/CreateGuestValidator'

export default class GuestsController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateGuestValidator)
    const guest = await Guest.create(data)
    return response.created({ message: 'Convidado criado com sucesso', guest })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const guest = await Guest.findOrFail(params.id)
    const data = request.only([
      'name',
      'phone',
      'email',
      'categoryguest_id',
      'table_id',
      'is_actived',
      'is_deleted',
      'present'
    ])
    guest.merge(data)
    await guest.save()
    return response.ok({ message: 'Convidado atualizado com sucesso', guest })
  }

  public async delete({ params, response }: HttpContextContract) {
    const guest = await Guest.findOrFail(params.id)
    guest.is_deleted = true
    await guest.save()
    return response.ok({ message: 'Convidado deletado com sucesso' })
  }

  public async findOne({ params, response }: HttpContextContract) {
    const guest = await Guest.findOrFail(params.id)
    await guest.load('categoryguest')
    await guest.load('table')
    return response.ok({ guest })
  }

  public async findAll({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const guests = await Guest.query().where('is_deleted', false).preload('categoryguest').preload('table').paginate(page, limit)
    return response.ok({ guests })
  }
}
