import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userModel from "../models/user.model.js";
import { reCAPTCHA } from "../services/recaptcha.js";
import { logger } from "../utils/logger.js";

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthController {
  register = async (req, res) => {
    const { name, email, password, recaptchaToken } = req.body;
    // console.log("name:", name);
    // console.log("email:", email);
    // console.log("password:", password);
    // console.log("recaptchaToken:", recaptchaToken);

    try {
      const isHuman = await reCAPTCHA(recaptchaToken);
      if (!isHuman) {
        return res
        .status(400)
        .json({ error: "Falló la verificación de reCAPTCHA" });
      }
      
      if (!name || !email || !password || !recaptchaToken) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.createUser({
          name,
          email,
          password: hashedPassword,
          role: "user", // Por defecto
      });

      logger.info(`Usuario registrado: ${user.id} - ${user.email}`);

      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        customerId: user.customerId,
      });
    } catch (err) {
      logger.error("Error en el registro de usuario:", err);
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  }

  login = async (req, res) => {
    const { email, password, recaptchaToken } = req.body;
    const isDev = process.env.NODE_ENV === "development";

    try {
      if (!isDev) {
        const isHuman = await reCAPTCHA(recaptchaToken);
        if (!isHuman) {
          return res
            .status(400)
            .json({ error: "Falló la verificación de reCAPTCHA" });
        }
      }

      const user = await userModel.findUserByEmail(email);
      if (!user)
        return res.status(401).json({ error: "Credenciales inválidas" });

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(401).json({ error: "Credenciales inválidas" });

      const token = jwt.sign({ userId: user.id, role: user.role, customerId: user.customerId }, JWT_SECRET, {
        expiresIn: "24h",
      });

      logger.info(`Inicio sesión: ${user.id} - ${user.email}`);

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 día
        })
        .status(200)
        .json({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            customerId: user.customerId,        
          },
        });
    } catch (err) {
      logger.error("Error en el login:", err);
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }

  changePassword = async (req, res) => {
    const { email, password, newPassword, recaptchaToken } = req.body;

    try {
      const isHuman = await reCAPTCHA(recaptchaToken);
      if (!isHuman) {
        return res
          .status(400)
          .json({ error: "Falló la verificación de reCAPTCHA" });
      }

      const user = await userModel.findUserByEmail(email);
      if (!user)
        return res.status(404).json({ error: "Credenciales invalidas" });

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(401).json({ error: "Credenciales invalidas" });

      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      const result = await userModel.updateUserPassword(
        email,
        newHashedPassword
      );
      // console.log(result);
      if (!result)
        return res
          .status(500)
          .json({ error: "Error al actualizar la contraseña" });
      logger.info(`Contraseña actualizada para el usuario: ${user.id}`);

      res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (err) {
      logger.error("Error al cambiar contraseña:", err);
      res.status(500).json({ error: "Error al cambiar la contraseña" });
    }
  }

  me = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "No autorizado" });
      }
      // console.log("User ID from token:", req.user.userId);
      const user = await userModel.findUserById(req.user.userId);
      const data = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        customerId: user.customerId,        
      };

      res.status(200).json({ user: data });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error al obtener información del usuario" });
    }
  }

  logout = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      logger.info("Usuario cerró sesión");
      res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (err) {
      logger.error("Error al cerrar sesión:", err);
      res.status(500).json({ error: "Error al cerrar la sesión" });
    }
  }
};
