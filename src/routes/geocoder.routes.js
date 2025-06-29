import { Router } from "express";
import { GeocoderController } from "../controllers/geocoder.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
// import { authLimiter } from '@/shared/middlewares/rateLimiter.js';

export const GeocoderRouter = Router();
const geocoderController = new GeocoderController()

GeocoderRouter.get("/find/search", /* geocoderLimiter ,*/ AuthMiddleware, (req, res) => geocoderController.find(req, res));

GeocoderRouter.get("/findAll/search", /* geocoderLimiter ,*/  (req, res) => geocoderController.findAll(req, res));

