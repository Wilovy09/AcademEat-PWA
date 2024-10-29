import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().optional(),
    profileImage: vine.string().optional(),
    isSeller: vine.string().optional(),
  })
)
