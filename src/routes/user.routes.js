import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

export const UserRouter = Router();
const userController = new UserController();

// Obtener los detalles de un usuario por correo electrónico
UserRouter.get("/:email", AuthMiddleware, (req, res) => userController.getUserByEmail(req, res));

// Obtener los detalles de un usuario por ID
UserRouter.get("/:id", AuthMiddleware, (req, res) => userController.getUserById(req, res));

// Eliminar un usuario por ID
UserRouter.delete("/:id", AuthMiddleware, (req, res) => userController.deleteUser(req, res));

export default UserRouter;
