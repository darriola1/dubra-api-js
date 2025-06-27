import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { AuthController } from '../controllers/auth.controller.js';
// import { RegisterSchema, LoginSchema, ChangePasswordSchema } from '../schemas/auth.schema.js';
// import { authLimiter } from '@/shared/middlewares/rateLimiter.js';

export const AuthRouter = Router();

// Route to register user with validation
AuthRouter.post('/register', (req, res) => AuthController.register(req, res));
// Route to login with validation
AuthRouter.post('/login', (req, res) => AuthController.login(req, res));
AuthRouter.get('/me', authMiddleware, (req, res) => AuthController.me(req, res));
// Route to change password with validation
AuthRouter.post('/change-password', (req, res) => AuthController.changePassword(req, res));
// Route to logout
AuthRouter.post('/logout', (req, res) => AuthController.logout(req, res));

// // Route to register user with validation
// AuthRouter.post('/register', validate(RegisterSchema), (req, res) => AuthController.register(req, res));
// // Route to login with validation
// AuthRouter.post('/login', validate(LoginSchema), (req, res) => AuthController.login(req, res));
// // Route to change password with validation
// AuthRouter.post('/change-password', validate(ChangePasswordSchema), (req, res) => AuthController.changePassword(req, res));
// // Route to logout
// AuthRouter.post('/logout', (req, res) => AuthController.logout(req, res));
// // Route to register user with validation
// router.post('/register', authLimiter, validateBody(RegisterSchema), (req, res) => authController.register(req, res));
// // Route to login with validation
// router.post('/login', authLimiter, validateBody(LoginSchema), (req, res) => authController.login(req, res));
// // Route to change password with validation
// router.post('/change-password', validateBody(ChangePasswordSchema), (req, res) => authController.changePassword(req, res));
// // Route to logout
// router.post('/logout', (req, res) => authController.logout(req, res));

