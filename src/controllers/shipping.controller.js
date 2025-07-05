import * as shippingModel from '../models/shipping.model.js'
import { logger } from '../utils/logger.js'

export class ShippingController {
  create = async (req, res) => {
    const { orderId } = req.params
    const shippingData = req.validatedData

    try {
      const shipping = await shippingModel.createShipping({
        ...shippingData,
        orderId: parseInt(orderId)
      })
      res.status(201).json({ shipping })
    } catch (err) {
      logger.error('Error al crear envío:', err)
      res.status(500).json({ error: 'No se pudo crear el envío' })
    }
  }

  findByUser = async (req, res) => {
    const { userId } = req.params
    try {
      const shippings = await shippingModel.findShippingsByUser(parseInt(userId))
      res.status(200).json({ shippings })
    } catch (err) {
      logger.error('Error al obtener envíos de la orden:', err)
      res.status(500).json({ error: 'Error interno al listar envíos' })
    }
  }
  
  findById = async (req, res) => {
    const { id } = req.params
    try {
      const shipping = await shippingModel.findShippingById(parseInt(id))
      if (!shipping) return res.status(404).json({ error: 'Envío no encontrado' })
      res.status(200).json({ shipping })
    } catch (err) {
      logger.error('Error al obtener envío:', err)
      res.status(500).json({ error: 'Error interno' })
    }
  }

  findAll = async (req, res) => {
    const { search, status, limit, offset } = req.query;

    // Paginación
    const parsedLimit = !isNaN(Number(limit)) ? parseInt(limit) : 10;  // 10 como valor por defecto, es el número de shippings por página
    const parsedOffset = !isNaN(Number(offset)) ? parseInt(offset) : 0;  // 0 como valor por defecto, es el valor inicial para la paginación

    try {
      // Llamada al modelo para obtener los envíos
      const result = await shippingModel.findAllShippings({
        search: typeof search === 'string' ? search : undefined,
        status: typeof status === 'string' ? status : undefined,
        limit: parsedLimit,
        offset: parsedOffset,
      });

      // Enviar la respuesta con los envíos encontrados y el total
      res.status(200).json(result); 
    } catch (err) {
      logger.error('Error al listar envíos:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  update = async (req, res) => {
    const { id } = req.params
    try {
      const updated = await shippingModel.updateShipping(parseInt(id), req.validatedData)
      res.status(200).json({ shipping: updated })
    } catch (err) {
      logger.error('Error al actualizar envío:', err)
      res.status(500).json({ error: 'No se pudo actualizar el envío' })
    }
  }

  remove = async (req, res) => {
    const { id } = req.params
    try {
      await shippingModel.deleteShipping(parseInt(id))
      res.status(204).send()
    } catch (err) {
      logger.error('Error al eliminar envío:', err)
      res.status(500).json({ error: 'No se pudo eliminar el envío' })
    }
  }
}
