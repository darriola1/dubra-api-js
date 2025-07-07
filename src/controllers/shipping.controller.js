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

  findByOrder = async (req, res) => {
    const { orderId } = req.params
    try {
      const shippings = await shippingModel.findShippingsByOrder(parseInt(orderId))
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
