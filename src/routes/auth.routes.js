import { Router } from "express";
import { ValidateBody } from "../middlewares/validate.middleware.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";
import { RegisterSchema, LoginSchema, ChangePasswordSchema } from '../schemas/auth.schema.js';
import { authLimiter } from "../middlewares/rate-limiter.js";
// import { authLimiter } from '@/shared/middlewares/rateLimiter.js';

export const AuthRouter = Router();
const authController = new AuthController()

// Route to register user with validation
AuthRouter.post("/register", authLimiter, ValidateBody(RegisterSchema), (req, res) => authController.register(req, res));

// Route to login user with validation
AuthRouter.post("/login", authLimiter, ValidateBody(LoginSchema), (req, res) => authController.login(req, res));

AuthRouter.get("/me", authLimiter, AuthMiddleware, (req, res) =>
  authController.me(req, res)
);

AuthRouter.post("/change-password", authLimiter, ValidateBody(ChangePasswordSchema), AuthMiddleware, (req, res) =>
  authController.changePassword(req, res)
);

AuthRouter.post("/logout", authLimiter, AuthMiddleware, (req, res) => authController.logout(req, res));
