import { z } from './zod-openapi.js'

export const createShippingSchema = z.object({
  fromAddress: z
    .string()
    .min(1, 'La dirección de origen es obligatoria')
    .openapi({ description: 'Dirección de origen', example: 'Calle 123, Montevideo' }),

  toAddress: z
    .string()
    .min(1, 'La dirección de destino es obligatoria')
    .openapi({ description: 'Dirección de destino', example: 'Avenida 456, Canelones' }),

  contactName: z
    .string()
    .optional()
    .openapi({ description: 'Nombre de contacto', example: 'Juan Pérez' }),

  contactPhone: z
    .string()
    .regex(/^(\+598)?\d{8}$/, 'Teléfono uruguayo inválido')
    .optional()
    .openapi({ description: 'Teléfono de contacto', example: '+59891234567' }),

  status: z
    .enum(['pendiente', 'en_camino', 'entregado', 'cancelado'])
    .optional()
    .openapi({ description: 'Estado del envío', example: 'pendiente' })
}).openapi({ description: 'Schema para crear envío' })

export const updateShippingSchema = createShippingSchema.partial().openapi({ description: 'Schema para actualizar envío' })
