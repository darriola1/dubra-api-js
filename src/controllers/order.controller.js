import * as orderModel from '../models/order.model.js'
import { logger } from '../utils/logger.js'

export class OrderController  {
  async create(req, res) {
    const { description } = req.validatedData
    const userId = req.user.userId

    try {
      const order = await orderModel.createOrder({ description, userId })
      res.status(201).json({ order })
    } catch (err) {
      logger.error('Error al crear orden:', err)
      res.status(500).json({ error: 'No se pudo crear la orden' })
    }
  }

  async findAll(req, res) {
    try {
      const orders = await orderModel.findAllOrders()
      res.json({ orders })
    } catch (err) {
      logger.error('Error al listar órdenes:', err)
      res.status(500).json({ error: 'Error interno' })
    }
  }

  async findByUser(req, res) {
    const userId = req.user.userId
    try {
      const orders = await orderModel.findOrdersByUser(userId)
      res.json({ orders })
    } catch (err) {
      logger.error('Error al obtener órdenes del usuario:', err)
      res.status(500).json({ error: 'Error interno' })
    }
  }

  async findById(req, res) {
    const id = parseInt(req.params.id)
    try {
      const order = await orderModel.findOrderById(id)
      if (!order) return res.status(404).json({ error: 'Orden no encontrada' })
      res.json({ order })
    } catch (err) {
      logger.error('Error al obtener orden:', err)
      res.status(500).json({ error: 'Error interno' })
    }
  }

  async update(req, res) {
    const id = parseInt(req.params.id)
    try {
      const order = await orderModel.updateOrder(id, req.validatedData)
      res.json({ order })
    } catch (err) {
      logger.error('Error al actualizar orden:', err)
      res.status(500).json({ error: 'No se pudo actualizar la orden' })
    }
  }

  async remove(req, res) {
    const id = parseInt(req.params.id)
    try {
      await orderModel.deleteOrder(id)
      res.status(204).send()
    } catch (err) {
      logger.error('Error al eliminar orden:', err)
      res.status(500).json({ error: 'No se pudo eliminar la orden' })
    }
  }
}
