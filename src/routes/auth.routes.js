import { Router } from 'express';
import { validate } from '@/middlewares/validate.js';
import { authController } from '@/controllers/auth.controller.js';
import { RegisterSchema, LoginSchema, ChangePasswordSchema } from '@/application/schemas/user.schema';
// import { authLimiter } from '@/shared/middlewares/rateLimiter.js';

const router = Router();

// Route to register user with validation
router.post('/register', validate(RegisterSchema), (req, res) => authController.register(req, res));
// Route to login with validation
router.post('/login', validate(LoginSchema), (req, res) => authController.login(req, res));
// Route to change password with validation
router.post('/change-password', validate(ChangePasswordSchema), (req, res) => authController.changePassword(req, res));
// Route to logout
router.post('/logout', (req, res) => authController.logout(req, res));
// // Route to register user with validation
// router.post('/register', authLimiter, validateBody(RegisterSchema), (req, res) => authController.register(req, res));
// // Route to login with validation
// router.post('/login', authLimiter, validateBody(LoginSchema), (req, res) => authController.login(req, res));
// // Route to change password with validation
// router.post('/change-password', validateBody(ChangePasswordSchema), (req, res) => authController.changePassword(req, res));
// // Route to logout
// router.post('/logout', (req, res) => authController.logout(req, res));

export default router;
