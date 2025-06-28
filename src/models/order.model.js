import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createOrder = async ({ description, userId }) => {
  if (!description || !userId) {
    throw new Error('Description and userId are required to create an order')
  }
  return prisma.order.create({ data: { description, userId } })
}

export const findAllOrders = async () => {
  return prisma.order.findMany({ orderBy: { createdAt: 'desc' } })
}

export const findOrdersByUser = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
}

export const findOrderById = async (id) => {
  return prisma.order.findUnique({ where: { id } })
}

export const updateOrder = async (id, data) => {
  return prisma.order.update({ where: { id }, data })
}

export const deleteOrder = async (id) => {
  return prisma.order.delete({ where: { id } })
}
