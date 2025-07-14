import { Router } from "express";
import { InvoiceController } from "../controllers/invoice.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { ValidateBody } from "../middlewares/validate.middleware.js";
import { createInvoiceSchema, updateInvoiceSchema } from "../schemas/invoice.schema.js";
import multer from "multer";

export const InvoiceRouter = Router();
const invoiceController = new InvoiceController();
const upload = multer({ storage: multer.memoryStorage() });

// Crear una factura
InvoiceRouter.post("/", AuthMiddleware, ValidateBody(createInvoiceSchema), (req, res) => invoiceController.createInvoice(req, res));

// Obtener todas las facturas
InvoiceRouter.get("/", AuthMiddleware, (req, res) => invoiceController.getAllInvoices(req, res));

// Obtener una factura por ID
InvoiceRouter.get("/:id", AuthMiddleware, (req, res) => invoiceController.getInvoiceById(req, res));

// Obtener todas las facturas de un cliente
InvoiceRouter.get("/customer/:customerId", AuthMiddleware, (req, res) => invoiceController.getInvoicesByCustomer(req, res));

// Actualizar una factura
InvoiceRouter.put("/:id", AuthMiddleware, ValidateBody(updateInvoiceSchema), (req, res) => invoiceController.updateInvoice(req, res));

// Eliminar una factura
InvoiceRouter.delete("/:id", AuthMiddleware, (req, res) => invoiceController.deleteInvoice(req, res));

// Subir un archivo asociado a una factura
InvoiceRouter.post("/:id/upload", AuthMiddleware, upload.single('file'), (req, res) =>
  invoiceController.uploadFile(req, res)
);

export default InvoiceRouter;
