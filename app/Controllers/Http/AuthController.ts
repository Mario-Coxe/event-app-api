import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersRegisterValidator from 'App/Validators/UsersRegisterValidator'
import User from 'App/Models/User'
import Ws from 'App/Services/Ws'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { identifier, password } = request.all()

    console.log(identifier)
    const user = await User.query()
      .where((query) => {
        query.where('email', identifier).orWhere('phone_number', identifier)
      })
      .firstOrFail()
    const token = await auth.use('api').attempt(user.phone_number, password, {})
    return response.ok({ token, user, message: 'Login Efectuado Com Sucesso' })
  }

  public async register({ request, response }: HttpContextContract) {
    const data = await request.validate(UsersRegisterValidator)
    const user = await User.create(data)

    Ws.io.emit('new:user', user)

    return response.ok({ message: 'Usuário Registrado', user })
  }
}
