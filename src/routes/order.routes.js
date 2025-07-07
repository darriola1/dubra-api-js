import { Router } from "express";
import { OrderController } from '../controllers/order.controller.js'
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { ValidateBody } from "../middlewares/validate.middleware.js";
import { createOrderSchema, updateOrderSchema } from '../schemas/order.schema.js'

export const OrderRouter = Router()
const orderController = new OrderController()

OrderRouter.post('/', AuthMiddleware, ValidateBody(createOrderSchema), (req, res) => orderController.create(req, res));

OrderRouter.get('/', AuthMiddleware, (req, res) => orderController.findAll(req, res));

OrderRouter.get('/my', AuthMiddleware, (req, res) => orderController.findByUser(req, res));

OrderRouter.get('/:id', AuthMiddleware, (req, res) => orderController.findById(req, res));

OrderRouter.put('/:id', AuthMiddleware, ValidateBody(updateOrderSchema), (req, res) => orderController.update(req, res));

OrderRouter.delete('/:id', AuthMiddleware, (req, res) => orderController.remove(req, res));
