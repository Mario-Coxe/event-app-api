import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invitation from 'App/Models/Invitation'
import CreateInvitationValidator from '../../Validators/CreateInvitationValidator';
import Ws from 'App/Services/Ws'

export default class InvitationsController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateInvitationValidator)
    const guest = await Invitation.create(data)
    const message = "Foste Convidado para o evento"

    Ws.io.emit('new:invitation', guest);

    return response.created({ message: 'Convite enviado com sucesso', guest })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const guest = await Invitation.findOrFail(params.id)
    const data = request.only([
      'event_id',
      'guest_id',
      'description',
      'is_actived',
      'is_deleted',
    ])
    guest.merge(data)
    await guest.save()
    Ws.io.emit('new:invitation', { data: guest, message: "Seu convite foi actualizado" });
    return response.ok({ message: 'Convite atualizado com sucesso', guest })
  }

  public async delete({ params, response }: HttpContextContract) {
    const guest = await Invitation.findOrFail(params.id)
    guest.is_deleted = true
    await guest.save()
    return response.ok({ message: 'Convite deletado com sucesso' })
  }

  public async findOne({ params, response }: HttpContextContract) {
    const guest = await Invitation.findOrFail(params.id)
    await guest.load('event')
    await guest.load('guest')
    return response.ok({ guest })
  }

  public async findAll({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const guests = await Invitation.query().where('is_deleted', false).preload('event').preload('guest').paginate(page, limit)
    return response.ok({ guests })
  }
}
