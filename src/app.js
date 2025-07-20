// imports de paquetes
import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// imports de servicios

// imports de codigo nuestro
import { AuthRouter } from "./routes/auth.routes.js";
import { ShippingRouter } from "./routes/shipping.routes.js";
import { UserRouter } from "./routes/user.routes.js";
import { CustomerRouter } from "./routes/customer.routes.js";
import { InvoiceRouter } from "./routes/invoice.routes.js";
import { PaymentRouter } from "./routes/payment.routes.js";
import { BalanceMovementRouter } from "./routes/balanceMovement.routes.js";
import { GeocoderRouter } from "./routes/geocoder.routes.js";
import { EmailRouter } from "./routes/email.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;
// Configuración de CORS
// Agregar ruta del front cuando este deployado
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
// habilitamos el parseo de json
app.use(json());
// ################################################################################################################
// Descomentar para debugg
// app.use((req, res, next) => {
//     console.log(`Request: ${req.method} ${req.url}`);
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);
//     console.log('User: ', req.user)
//     next();
// });
// ################################################################################################################

//habilit en express la lectura de cookies
app.use(cookieParser());
// Se deshabilita el header 'x-powered-by' por "seguridad".
app.disable("x-powered-by");
// Ruta base para verificar que la API está funcionando
app.get("/api/health", (_req, res) => {
  res.send(`🚀 Dubra API funcionando correctamente ${PORT}`);
});

// Rutas
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/customer", CustomerRouter);
app.use("/api/shipping", ShippingRouter);
app.use("/api/invoice", InvoiceRouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/balance-movement", BalanceMovementRouter);
app.use("/api/geocoder", GeocoderRouter);
app.use("/api/email", EmailRouter);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource could not be found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log del error en consola
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred",
  });
});

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

export default app;
