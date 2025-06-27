import { Router } from 'express'
import { ShippingController } from '../controllers/shipping.controller.js'
import { AuthMiddleware } from '../middlewares/auth.middleware.js'
import { ValidateBody } from '../middlewares/validate.middleware.js'
import {
  createShippingSchema,
  updateShippingSchema
} from '../schemas/shippingSchema.js'

export const ShippingRouter = Router()

// Crear envío asociado a una orden
ShippingRouter.post(
  '/orders/:orderId/shippings',
  AuthMiddleware,
  ValidateBody(createShippingSchema),
  (req, res) => ShippingController.create(req, res)
)

// Listar todos los envíos de una orden
ShippingRouter.get(
  '/orders/:orderId/shippings',
  AuthMiddleware,
  (req, res) => ShippingController.findByOrder(req, res)
)

// Obtener un envío por ID
ShippingRouter.get(
  '/shippings/:id',
  AuthMiddleware,
  (req, res) => ShippingController.findById(req, res)
)

// Actualizar un envío
ShippingRouter.put(
  '/shippings/:id',
  AuthMiddleware,
  ValidateBody(updateShippingSchema),
  (req, res) => ShippingController.update(req, res)
)

// Eliminar un envío
ShippingRouter.delete(
  '/shippings/:id',
  AuthMiddleware,
  (req, res) => ShippingController.remove(req, res)
)
