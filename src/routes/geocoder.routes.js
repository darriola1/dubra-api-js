import { Router } from "express";
import { GeocoderController } from "../controllers/geocoder.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { geoCoderLimiter } from "../middlewares/rate-limiter.js";

export const GeocoderRouter = Router();
const geocoderController = new GeocoderController()

GeocoderRouter.get("/find/search", geoCoderLimiter, AuthMiddleware, (req, res) => geocoderController.find(req, res));

GeocoderRouter.get("/findAll/search", geoCoderLimiter,  (req, res) => geocoderController.findAll(req, res));

