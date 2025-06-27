import { Router } from "express";
import { ValidateBody } from "../middlewares/validate.middleware.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";
import { RegisterSchema, LoginSchema, ChangePasswordSchema } from '../schemas/auth.schema.js';
// import { authLimiter } from '@/shared/middlewares/rateLimiter.js';

export const AuthRouter = Router();

// Route to register user with validation
AuthRouter.post("/register", ValidateBody(RegisterSchema), (req, res) => AuthController.register(req, res));
// Route to login with validation
AuthRouter.post("/login", ValidateBody(LoginSchema), (req, res) => AuthController.login(req, res));
// Route to get user profile
AuthRouter.get("/me", AuthMiddleware, (req, res) =>
  AuthController.me(req, res)
);
// Route to change password with validation
AuthRouter.post("/change-password", ValidateBody(ChangePasswordSchema), AuthMiddleware, (req, res) =>
  AuthController.changePassword(req, res)
);
// Route to logout
AuthRouter.post("/logout", AuthMiddleware, (req, res) => AuthController.logout(req, res));
