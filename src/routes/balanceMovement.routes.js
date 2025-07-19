import { Router } from "express";
import { BalanceMovementController } from "../controllers/balanceMovement.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { ValidateBody } from "../middlewares/validate.middleware.js";
import { createBalanceMovementSchema, updateBalanceMovementSchema } from "../schemas/balanceMovement.schema.js";

export const BalanceMovementRouter = Router();
const balanceMovementController = new BalanceMovementController();

// Crear un movimiento de saldo
BalanceMovementRouter.post("/", AuthMiddleware, ValidateBody(createBalanceMovementSchema), (req, res) => balanceMovementController.createBalanceMovement(req, res));

// Obtener todos los movimientos de saldo
BalanceMovementRouter.get("/", AuthMiddleware, (req, res) => balanceMovementController.getAllBalanceMovements(req, res));

// Obtener los movimientos de saldo de un cliente
BalanceMovementRouter.get("/customer/:customerId", AuthMiddleware, (req, res) => balanceMovementController.getBalanceMovementsByCustomer(req, res));

// Obtener un movimiento de saldo por ID
BalanceMovementRouter.get("/:id", AuthMiddleware, (req, res) => balanceMovementController.getBalanceMovementById(req, res));

// Actualizar un movimiento de saldo
BalanceMovementRouter.put("/:id", AuthMiddleware, ValidateBody(updateBalanceMovementSchema), (req, res) => balanceMovementController.updateBalanceMovement(req, res));

// Eliminar un movimiento de saldo
BalanceMovementRouter.delete("/:id", AuthMiddleware, (req, res) => balanceMovementController.deleteBalanceMovement(req, res));

export default BalanceMovementRouter;