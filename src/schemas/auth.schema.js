import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  name: z.string().min(2).max(100)
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100)
});

export const ChangePasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  newPassword: z.string().min(6).max(100)
})