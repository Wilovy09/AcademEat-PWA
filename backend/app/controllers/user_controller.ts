import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async update({ request, response, auth }: HttpContext) {
    try {
      const user = await auth.authenticate()

      return response.ok({ message: 'succes', user })
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error to update user', error })
    }
  }
}
