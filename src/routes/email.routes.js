import { Router } from "express";
import { EmailController } from "../controllers/email.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";


export const EmailRouter = Router();
const emailController = new EmailController();

EmailRouter.post('/send', AuthMiddleware, (req, res) => emailController.send(req, res));