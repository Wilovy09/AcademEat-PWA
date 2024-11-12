import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    storeId: vine.number(),
    name: vine.string().maxLength(254),
    description: vine.string(),
    category: vine.string(),
    price: vine.number(),
    stock: vine.number(),
    image: vine.string(),
  })
)
