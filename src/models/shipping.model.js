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

export const findShippingsByUser = async (userId) => {
  return prisma.shipping.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
}

export const findAllShippings = async ({ search, status, fromDate, toDate, limit, offset, userId, customerId }) => {
  const where = {
    AND: [
      userId ? { userId } : {},
      customerId ? { User: { customerId } } : {}, // 👈 filtro por empresa
      search ? {
        OR: [
          { fromAddress: { contains: search } },
          { toAddress: { contains: search } },
          { contactName: { contains: search } },
        ]
      } : {},
      status ? { status } : {},
      fromDate ? { createdAt: { gte: new Date(fromDate) } } : {},
      toDate ? { createdAt: { lte: new Date(toDate) } } : {},
    ],
  };

  const [items, total] = await Promise.all([
    prisma.shipping.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.shipping.count({ where }),
  ]);

  return { items, total };
};

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
