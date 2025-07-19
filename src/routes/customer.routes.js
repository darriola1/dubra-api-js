import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { ValidateBody } from "../middlewares/validate.middleware.js";
import { createCustomerSchema, updateCustomerSchema } from "../schemas/customer.schema.js";

export const CustomerRouter = Router();
const customerController = new CustomerController();

// Crear un nuevo cliente
CustomerRouter.post("/", AuthMiddleware, ValidateBody(createCustomerSchema), (req, res) => customerController.createCustomer(req, res));

// Obtener todos los clientes
CustomerRouter.get("/", AuthMiddleware, (req, res) => customerController.getAllCustomers(req, res));

// Obtener un cliente por ID
CustomerRouter.get("/:RUT", AuthMiddleware, (req, res) => customerController.getCustomerByRUT(req, res));

// Actualizar un cliente
CustomerRouter.put("/:id", AuthMiddleware, ValidateBody(updateCustomerSchema), (req, res) => customerController.updateCustomer(req, res));

// Eliminar un cliente por ID
CustomerRouter.delete("/:id", AuthMiddleware, (req, res) => customerController.deleteCustomer(req, res));

export default CustomerRouter;