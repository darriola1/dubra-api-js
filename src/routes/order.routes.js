import { Router } from "express";
import { OrderController } from '../controllers/order.controller.js'
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { ValidateBody } from "../middlewares/validate.middleware.js";
import { createOrderSchema, updateOrderSchema } from '../schemas/order.schema.js'

export const OrderRouter = Router()

// Crear orden (requiere login)
OrderRouter.post('/orders', AuthMiddleware, ValidateBody(createOrderSchema), (req, res) => OrderController.create(req, res))

// Listar TODAS las órdenes (requiere login)
OrderRouter.get('/orders', AuthMiddleware, (req, res) => OrderController.findAll(req, res))

// Listar órdenes del usuario autenticado
OrderRouter.get('/orders/my', AuthMiddleware, (req, res) => OrderController.findByUser(req, res))

// Obtener orden por ID
OrderRouter.get('/orders/:id', AuthMiddleware, (req, res) => OrderController.findById(req, res))

// Actualizar orden
OrderRouter.put('/orders/:id', AuthMiddleware, ValidateBody(updateOrderSchema), (req, res) => OrderController.update(req, res))

// Eliminar orden
OrderRouter.delete('/orders/:id', AuthMiddleware, (req, res) => OrderController.remove(req, res))
