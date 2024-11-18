import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductController {
  async get({ response }: HttpContext) {
    try {
      const products = await Product.all()
      return response.status(200).json(products)
    } catch (error) {
      return response.status(500).json({
        message: 'Error fetching products',
        error: error.message,
      })
    }
  }

  async getProducts({ response, params }: HttpContext) {
    try {
      const { storeId } = params
      const products = await Product.findManyBy('store_id', storeId)
      return response.status(200).json(products)
    } catch (error) {
      return response.status(500).json({
        message: 'Error fetching products',
        error: error,
      })
    }
  }

  async find({ params, response }: HttpContext) {
    const { id } = params
    try {
      const product = await Product.find(id)
      if (!product) {
        return response.status(404).json({
          message: 'Product not found',
        })
      }
      return response.status(200).json(product)
    } catch (e) {
      return response.status(500).json({
        message: 'Error fetching product',
        error: e.message,
      })
    }
  }

  async create({ request, response }: HttpContext) {
    try {
      const { storeId, name, description, category, price, stock, image } =
        await request.validateUsing(createProductValidator)

      const store = await Product.create({
        storeId,
        name,
        description,
        category,
        price,
        stock,
        image,
      })

      return response.status(201).json({ store })
    } catch (e) {
      return response.status(400).json({
        message: 'Error creating product',
        error: e,
      })
    }
  }

  async delete({ response, params }: HttpContext) {
    const { id } = params
    try {
      const product = await Product.find(id)
      if (!product) {
        return response.status(404).json({
          message: 'Product not found',
        })
      }

      await product.delete()
      return response.status(200).json({
        message: 'Product deleted successfully',
      })
    } catch (e) {
      return response.status(500).json({
        message: 'Error deleting product',
        error: e.message,
      })
    }
  }

  async update({ request, response, params }: HttpContext) {
    const { id } = params
    try {
      const product = await Product.find(id)
      if (!product) {
        return response.status(404).json({
          message: 'Product not found',
        })
      }

      const { name, description, category, price, stock, image } = request.only([
        'name',
        'description',
        'category',
        'price',
        'stock',
        'image',
      ])

      product.merge({ name, description, category, price, stock, image })
      await product.save()

      return response.status(200).json({
        message: 'Product updated successfully',
        product,
      })
    } catch (e) {
      return response.status(400).json({
        message: 'Error updating product',
        error: e.message,
      })
    }
  }
}
