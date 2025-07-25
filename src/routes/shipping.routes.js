import { Router } from "express";
import { ShippingController } from "../controllers/shipping.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { ValidateBody } from "../middlewares/validate.middleware.js";
import {
  createShippingSchema,
  updateShippingSchema,
} from "../schemas/shipping.schema.js";

export const ShippingRouter = Router();
const shippingController = new ShippingController();

// Crear envío asociado a una orden
ShippingRouter.post(
  "/order/:orderId/shippings",
  AuthMiddleware,
  ValidateBody(createShippingSchema),
  (req, res) => shippingController.create(req, res)
);

// Listar todos los envíos de una orden
ShippingRouter.get("/order/:orderId/shippings", AuthMiddleware, (req, res) =>
  shippingController.findByOrder(req, res)
);

// Obtener un envío por ID
ShippingRouter.get("/:id", AuthMiddleware, (req, res) =>
  shippingController.findById(req, res)
);

// Actualizar un envío
ShippingRouter.put(
  "/:id",
  AuthMiddleware,
  ValidateBody(updateShippingSchema),
  (req, res) => shippingController.update(req, res)
);

// Eliminar un envío
ShippingRouter.delete("/:id", AuthMiddleware, (req, res) =>
  shippingController.remove(req, res)
);
