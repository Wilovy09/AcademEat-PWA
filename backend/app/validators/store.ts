import vine from '@vinejs/vine'

export const createStoreValidator = vine.compile(
  vine.object({
    ownerId: vine.number(),
    name: vine.string().maxLength(254),
    description: vine.string(),
    category: vine.string().optional(),
    portraitImage: vine.string().optional(),
    storeImage: vine.string().optional(),
  })
)

export const editStoreValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    description: vine.string().optional(),
    portraitImage: vine.string().optional(),
    storeImage: vine.string().optional(),
  })
)
