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

export const findAllShippings = async ({ search, status, limit, offset }) => {
  try {
    const shippings = await prisma.shipping.findMany({
      where: {
        // Filtrado por búsqueda de texto (en direcciones, nombres, etc.)
        AND: [
          search ? {
            OR: [
              { fromAddress: { contains: search, mode: 'insensitive' } },
              { toAddress: { contains: search, mode: 'insensitive' } },
              { contactName: { contains: search, mode: 'insensitive' } },
            ]
          } : {},
          status ? { status: status } : {},
        ]
      },
      take: limit,  // Limitar los resultados
      skip: offset, // Desplazamiento para la paginación
      orderBy: {
        createdAt: 'desc'  // Ordenar por fecha de creación
      }
    });

    return shippings;
  } catch (err) {
    throw new Error('Error al obtener los envíos: ' + err.message);
  }
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
