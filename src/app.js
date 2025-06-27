// imports de paquetes
import express, { json } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
// imports de servicios

// imports de codigo nuestro
import {AuthRouter} from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3003;
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
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('User: ', req.user)
    next();
});
// ################################################################################################################

//habilit en express la lectura de cookies
app.use(cookieParser());
// Se deshabilita el header 'x-powered-by' por "seguridad".
app.disable("x-powered-by");
// Ruta base para verificar que la API está funcionando
app.get("/", (_req, res) => {
  res.send(`🚀 Dubra API funcionando correctamente ${PORT}`);
});
// Rutas
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
