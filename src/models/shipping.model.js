import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function generateTrackingId() {
  return 'DUB-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

export const createShipping = async ({ orderId, ...data }) => {
  const trackingId = generateTrackingId()
  return prisma.shipping.create({
    data: {
      ...data,
      orderId,
      trackingId
    }
  })
}

export const findShippingById = async (id) => {
  return prisma.shipping.findUnique({ where: { id } })
}

export const findShippingsByOrder = async (orderId) => {
  return prisma.shipping.findMany({
    where: { orderId },
    orderBy: { createdAt: 'desc' }
  })
}

export const updateShipping = async (id, data) => {
  return prisma.shipping.update({
    where: { id },
    data
  })
}

export const deleteShipping = async (id) => {
  return prisma.shipping.delete({
    where: { id }
  })
}
