import { z } from 'zod'

export const createBalanceMovementSchema = z.object({
  description: z
    .string()
    .min(1, 'La descripción es obligatoria')
    .max(100, 'La descripción no puede exceder los 100 caracteres'),
  
  amount: z
    .number()
    .min(1, 'El monto debe ser un valor numérico')
    .int('El monto debe ser un número entero')
    .refine((val) => val !== 0, 'El monto no puede ser 0'),
  
  customerId: z
    .number()
    .min(1, 'El cliente es obligatorio'),
  
  invoiceId: z
    .number()
    .optional()
})

export const updateBalanceMovementSchema = createBalanceMovementSchema.partial()
