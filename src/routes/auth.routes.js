import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";
// import { RegisterSchema, LoginSchema, ChangePasswordSchema } from '../schemas/auth.schema.js';
// import { authLimiter } from '@/shared/middlewares/rateLimiter.js';

export const AuthRouter = Router();

// Route to register user with validation
AuthRouter.post("/register", (req, res) => AuthController.register(req, res));
// Route to login with validation
AuthRouter.post("/login", (req, res) => AuthController.login(req, res));
// Route to get user profile
AuthRouter.get("/me", authMiddleware, (req, res) =>
  AuthController.me(req, res)
);
// Route to change password with validation
AuthRouter.post("/change-password", authMiddleware, (req, res) =>
  AuthController.changePassword(req, res)
);
// Route to logout
AuthRouter.post("/logout", authMiddleware, (req, res) => AuthController.logout(req, res));
