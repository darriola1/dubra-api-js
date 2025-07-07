import { z } from 'zod'

export const createCustomerSchema = z.object({
  nombre_fantasia: z
    .string()
    .min(1, 'El nombre de fantasía es obligatorio')
    .max(100, 'El nombre de fantasía no puede exceder los 100 caracteres'),
  
  razon_social: z
    .string()
    .min(1, 'La razón social es obligatoria')
    .max(100, 'La razón social no puede exceder los 100 caracteres'),
  
  RUT: z
    .string()
    .min(1, 'El RUT es obligatorio')
    .regex(/^\d{12}$/, 'El RUT debe tener 12 dígitos'),
  
})

export const updateCustomerSchema = createCustomerSchema.partial()
