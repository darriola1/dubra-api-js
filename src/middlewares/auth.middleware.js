import jwt from "jsonwebtoken";
// import CustomError from "../utils/custom.error.js";
import { logger } from "../utils/logger.js";

export const AuthMiddleware = (req, res, next) => {
//   console.log("Auth middleware triggered"); // Log para depuración
  // Primero intentamos obtener el token desde la cookie
  let token = req.cookies?.token;
  console.log("Token from cookie:", token); // Log para depuración

  // Si no está en la cookie, intentamos desde el header
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    // throw CustomError.unauthorized("Token is missing");
    res.status(401).json({
      error: "Unauthorized",
      message: "Token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded); // Log para depuración
    req.user = decoded;
    next();
  } catch (err) {
    logger.error("JWT verification error:", err); // Log the actual error for debugging
    // throw CustomError.unauthorized('Invalid or expired token');
    res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or expired token",
    });
  }
};
