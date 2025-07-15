import { payment, preference } from "../config/mercadopago.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


//Delay entre reintentos de la funciona getPaymentWithRetry
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//Intentar obtener los datos del pago desde MercadoPago con logica de reintento.
//Si la llamada falla, se vuelve a intentar hasta agotar 5 reintentos especificados por parametro.

const getPaymentWithRetry = async (id, retries = 5, delayMs = 2000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await payment.get({ id });
            return res.body || res;
        } catch (err) {
            if (i === retries - 1) throw err; // Si es el ultimo intento, lanza el error.
            await delay(delayMs); // Espera antes de reintentar.
        }
    }
};

export class PaymentController {
    createCheckoutPreference = async (req, res) => {
        const { invoiceId, description, amount, user } = req.body;

        try {
            const preferenceData = {
                items: [
                    {
                        title: description || "Pago de factura",
                        quantity: 1,
                        unit_price: parseFloat(amount),
                        currency_id: "UYU",
                    },
                ],
                payer: {
                    email: user.email,
                },
                back_urls: {
                    success: `${process.env.APP_URL_MP}/success`,
                    failure: `${process.env.APP_URL_MP}/failure`,
                    pending: `${process.env.APP_URL_MP}/pending`,
                },
                auto_return: "approved",
                notification_url: `${process.env.APP_URL_MP}/api/payment/webhook`,
                metadata: {
                    invoice_id: invoiceId.toString(),
                    amount: parseFloat(amount),
                },
            };
            
            const response = await preference.create({ body: preferenceData });

            if (!response.init_point) {
                return res.status(500).json({ error: "No se pudo generar el link de pago" });
            }
            return res.status(200).json({ init_point: response.init_point });
        } catch (error) {
            return res.status(500).json({ error: "Error generando preferencia" });
        }
    };

    handleWebhook = async (req, res) => {
        try {
            console.log("Webhook recibido:", req.query || req.body);

            const type = req.query.type || req.body.type || req.query.topic || req.body.topic;
            const paymentId = req.query["data.id"] || req.query.id || req.body["data.id"] || req.body.id;

            if (type !== "payment") {
                return res.sendStatus(200);
            }

            if (!paymentId) {
                return res.sendStatus(400);
            }

            const paymentData = await getPaymentWithRetry(paymentId);

            const invoiceId = paymentData.metadata?.invoice_id;
            const status = paymentData.status;
            const metodo = paymentData.payment_method_id;
            const mpPaymentId = paymentData.id?.toString();

            if (!invoiceId) {
                return res.sendStatus(204);
            }

            // Buscar el movimiento de deuda existente
            const deuda = await prisma.balanceMovement.findFirst({
                where: {
                    invoice: {
                        id: parseInt(invoiceId),
                    },
                    amount: { lt: 0 },
                }
            });

            if (!deuda) {
                return res.sendStatus(404);
            }

            // Actualizar la deuda como pagada
            await prisma.balanceMovement.update({
                where: { id: deuda.id },
                data: {
                    customerId: deuda.customerId,
                    invoiceId: deuda.invoiceId,
                    amount: Math.abs(deuda.amount),
                    mpPaymentId,
                    metodo,
                    estado: status,
                    amountAfter: 0 
                }
            });

            // Actualizar saldo acumulado del cliente
            const movimientos = await prisma.balanceMovement.findMany({
                where: {
                    customerId: deuda.customerId
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });

            let saldo = 0;
            for (const mov of movimientos) {
                saldo += mov.amount;
                await prisma.balanceMovement.update({
                    where: { id: mov.id },
                    data: { amountAfter: saldo }
                });
            }
            return res.sendStatus(200);
        } catch (error) {
            return res.status(500).send("Error interno");
        }
    };
}
