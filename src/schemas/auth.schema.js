import { z } from 'zod'

// Registro
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, 'Name is required, minimum 3 characters')
    .refine((val) => !/<\/?[a-z][\s\S]*>/i.test(val), {
      message: 'Name contains invalid characters',
    }),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .refine((val) => /[a-z]/.test(val), { message: 'Must contain at least one lowercase letter' })
    .refine((val) => /[A-Z]/.test(val), { message: 'Must contain at least one uppercase letter' })
    .refine((val) => /\d/.test(val), { message: 'Must contain at least one number' })
    .refine((val) => /[\W_]/.test(val), { message: 'Must contain at least one symbol' }),
})

// Login
export const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

// Cambio de contraseña
export const ChangePasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Current password must be at least 6 characters long'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
})
