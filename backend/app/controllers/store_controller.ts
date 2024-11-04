import type { HttpContext } from '@adonisjs/core/http'
import { createStoreValidator, editStoreValidator } from '#validators/store'
import Store from '#models/store'
import User from '#models/user'

export default class StoreController {
  async create({ request, response }: HttpContext) {
    try {
      const { ownerId, name, description, category, portraitImage, storeImage } =
        await request.validateUsing(createStoreValidator)

      const store = await Store.create({
        ownerId,
        name,
        description,
        category,
        portraitImage,
        storeImage,
      })

      const existingUser = await User.find(ownerId)
      if (!existingUser) {
        return response.status(404).json({
          error: 'User not found',
        })
      }
      existingUser.isSeller = 'true'
      await existingUser.save()

      return response.status(201).json({
        message: 'Store created successfully',
        store,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Error creating store',
        error: error.message,
      })
    }
  }

  // Get all stores
  async get({ response }: HttpContext) {
    try {
      const stores = await Store.all() // Obtiene todas las tiendas
      return response.status(200).json(stores)
    } catch (error) {
      return response.status(500).json({
        message: 'Error fetching stores',
        error: error.message,
      })
    }
  }

  // Find a store by ID
  async find({ params, response }: HttpContext) {
    const { id } = params
    try {
      const store = await Store.find(id)
      if (!store) {
        return response.status(404).json({
          error: 'Store not found',
        })
      }
      return response.status(200).json(store)
    } catch (error) {
      return response.status(500).json({
        message: 'Error fetching store',
        error: error.message,
      })
    }
  }

  // Delete store by ID
  async delete({ params, response, auth }: HttpContext) {
    const { id } = params
    try {
      await auth.check()
      const user = auth.user
      const store = await Store.find(id)
      if (!store) {
        return response.status(404).json({
          error: 'Store not found',
        })
      }
      if (!user) {
        return response.status(404).json({
          error: 'User not found',
        })
      }
      await store.delete() // Elimina la tienda
      user.isSeller = 'false' // Cambia el estado del usuario a no vendedor
      await user.save() // Guarda el usuario
      return response.status(204) // Retorna un 204 No Content
    } catch (error) {
      return response.status(500).json({
        message: 'Error deleting store',
        error: error.message,
      })
    }
  }

  async edit({ params, request, response, auth }: HttpContext) {
    const { id } = params
    try {
      const { name, description, portraitImage, storeImage } =
        await request.validateUsing(editStoreValidator)
      const store = await Store.find(id)
      await auth.check()
      const user = auth.user

      if (!store) {
        return response.status(404).json({
          error: 'Store not found',
        })
      }
      if (!user) {
        return response.status(404).json({
          error: 'User not found',
        })
      }
      if (store.ownerId !== user.id) {
        return response.status(403).json({
          error: 'Unauthorized',
        })
      }

      if (name) {
        store.name = name
      }
      if (description) {
        store.description = description
      }
      if (portraitImage) {
        store.portraitImage = portraitImage
      }
      if (storeImage) {
        store.storeImage = storeImage
      }

      await store.save()
      return response.status(200).json(store)
    } catch (e) {
      console.log(e)
    }
  }
}
