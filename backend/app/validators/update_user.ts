import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    full_name: vine.string().optional(),
    profile_image: vine.string().optional(),
    is_seller: vine.string().optional(),
  })
)
