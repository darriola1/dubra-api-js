import { z } from 'zod'

export const createShippingSchema = z.object({
  fromAddress: z
    .string()
    .min(1, 'La dirección de origen es obligatoria'),

  toAddress: z
    .string()
    .min(1, 'La dirección de destino es obligatoria'),

  contactName: z
    .string()
    .optional(),

  contactPhone: z
    .string()
    .regex(/^(\+598)?\d{8}$/, 'Teléfono uruguayo inválido')
    .optional(),

  status: z
    .enum(['pendiente', 'en_camino', 'entregado', 'cancelado'])
    .optional()
})


export const updateShippingSchema = createShippingSchema.partial()
