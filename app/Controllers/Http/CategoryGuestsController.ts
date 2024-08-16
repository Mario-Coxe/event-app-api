import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCategoryGuestsValidator from 'App/Validators/CreateCategoryGuestValidator'
import CategoryGuest from 'App/Models/CategoryGuest'
export default class CategoryGuestsController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateCategoryGuestsValidator)
    const category = await CategoryGuest.create(data)
    return response.created({ message: 'Categoria criada com sucesso', category })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const category = await CategoryGuest.findOrFail(params.id)
    const data = request.only(['name', 'description', 'is_actived', 'is_deleted'])
    category.merge(data)
    await category.save()
    return response.ok({ message: 'Categoria atualizada com sucesso', category })
  }

  public async delete({ params, response }: HttpContextContract) {
    const category = await CategoryGuest.findOrFail(params.id)
    category.$is_deleted = true
    await category.save()
    return response.ok({ message: 'Categoria deletada com sucesso' })
  }

  public async findOne({ params, response }: HttpContextContract) {
    const category = await CategoryGuest.findOrFail(params.id)
    return response.ok({ category })
  }

  public async findAll({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const categories = await CategoryGuest.query().where('is_deleted', false).paginate(page, limit)
    return response.ok({ categories })
  }
}
