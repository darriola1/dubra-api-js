import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";

export const PaymentRouter = Router();
const paymentController = new PaymentController();

//para generar link de pago
PaymentRouter.post("/checkout", (req, res) =>
  paymentController.createCheckoutPreference(req, res)
);

//para recibir Webhook desde MP
PaymentRouter.post("/webhook", (req, res) =>
  paymentController.handleWebhook(req, res)
);

export default PaymentRouter;