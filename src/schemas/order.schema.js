import { z } from 'zod'

// Crear orden
export const createOrderSchema = z.object({
  description: z
    .string()
    .min(1, 'La descripción es obligatoria')
})

// Actualizar orden (parcial)
export const updateOrderSchema = createOrderSchema.partial()
