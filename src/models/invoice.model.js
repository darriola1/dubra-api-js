import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createInvoice = async ({ number, fileBase64, customerId }) => {
  return prisma.invoice.create({
    data: {
      number,
      fileBase64,
      customerId,
    },
  });
};

export const findAllInvoices = async ({ search, customerId, status, fromDate, toDate, limit, offset }) => {
  try {
    const where = {
      AND: [
        search
          ? {
            OR: [
              { number: { contains: search } },
              { customer: { nombre_fantasia: { contains: search } } },
            ],
          }
          : {},
        customerId ? { customerId } : {},
        status ? { movement: { is: { estado: status } } } : {},
        fromDate ? { createdAt: { gte: fromDate } } : {},
        toDate ? { createdAt: { lte: toDate } } : {},
      ],
    };

    const [rows, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        include: {
          movement: true,
          customer: true,
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.invoice.count({ where }),
    ]);

    return { rows, total };
  } catch (err) {
    throw new Error('Error al obtener las facturas: ' + err.message);
  }
};

export const findInvoiceById = async (id) => {
  return prisma.invoice.findUnique({
    where: { id }, include: {
      movement: true,
      customer: true,
    },
  });
};

export const findInvoicesByCustomer = async ({ customerId, search, status, fromDate, toDate, limit, offset }) => {
  try {
    const where = {
      AND: [
        { customerId },
        search
          ? {
            OR: [
              { number: { contains: search } },
              { customer: { nombre_fantasia: { contains: search } } },
            ],
          }
          : {},
        status ? { movement: { is: { estado: status } } } : {},
        fromDate ? { createdAt: { gte: fromDate } } : {},
        toDate ? { createdAt: { lte: toDate } } : {},
      ],
    };

    return prisma.invoice.findMany({
      where,
      include: {
        movement: true,
        customer: true,
      },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    throw new Error("Error al obtener facturas del cliente: " + err.message);
  }
};

export const updateInvoice = async (id, data) => {
  return prisma.invoice.update({
    where: { id },
    data,
  });
};

export const deleteInvoice = async (id) => {
  return prisma.invoice.delete({
    where: { id },
  });
};
