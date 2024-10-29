import User from '#models/user'
import { updateUserValidator } from '#validators/update_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async update({ request, response, auth }: HttpContext) {
    try {
      const user = await auth.authenticate()
      const { fullName, profileImage, isSeller } = await request.validateUsing(updateUserValidator)

      console.log(fullName, profileImage, isSeller)

      const existingUser = await User.find(user.id)
      if (!existingUser) {
        return response.notFound({ message: 'User not found' })
      }

      if (isSeller !== 'false' && isSeller !== 'true' && isSeller !== undefined) {
        return response.badRequest({ message: 'isSeller must to be "false" or "true"' })
      }

      if (fullName) existingUser.fullName = fullName
      if (profileImage) existingUser.profileImage = profileImage
      if (isSeller !== undefined) existingUser.isSeller = isSeller

      await existingUser.save()

      return response.ok({ message: 'Success', user: existingUser })
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error updating user', error: error.message })
    }
  }
}
