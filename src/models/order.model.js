import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function generateOrderCode() {
  return 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

export const createOrder = async ({ description, userId }) => {
  const code = generateOrderCode()
  return prisma.order.create({ data: { code, description, userId } })
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
