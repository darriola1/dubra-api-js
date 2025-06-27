import { UserSchema } from '../generated/zod/modelSchema/UserSchema.ts'

export const RegisterSchema = UserSchema.pick({
  email: true,
  password: true,
  name: true
})

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true
})

export const ChangePasswordSchema = UserSchema.pick({
  email: true,
  password: true,
  newPassword: true
})