import { z } from 'zod'

const zNumber = z.coerce.number()

export const validateRequest = z.object({
  description: z.string(),
  retailPrice: zNumber,
  wholesalePrice: zNumber,
  categories: z.array(zNumber)
}).required()
