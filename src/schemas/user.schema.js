import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio'),

  email: z
    .string()
    .email('Correo electrónico inválido')
    .min(1, 'El correo electrónico es obligatorio'),
  
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .refine((val) => /[a-z]/.test(val), { message: 'Debe contener al menos una letra minúscula' })
    .refine((val) => /[A-Z]/.test(val), { message: 'Debe contener al menos una letra mayúscula' })
    .refine((val) => /\d/.test(val), { message: 'Debe contener al menos un número' })
    .refine((val) => /[\W_]/.test(val), { message: 'Debe contener al menos un símbolo' }),
  
  role: z
    .string()
    .optional()
    .default('user'), // Valor predeterminado es 'user',
  
  customerId: z
    .number()
    .optional() // Campo opcional para el ID del cliente
})

export const updateUserSchema = createUserSchema.partial()
