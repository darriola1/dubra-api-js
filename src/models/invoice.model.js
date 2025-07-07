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

export const findAllInvoices = async () => {
  return prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } });
};

export const findInvoiceById = async (id) => {
  return prisma.invoice.findUnique({ where: { id } });
};

export const findInvoicesByCustomer = async (customerId) => {
  return prisma.invoice.findMany({
    where: { customerId },
    orderBy: { createdAt: 'desc' },
  });
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
