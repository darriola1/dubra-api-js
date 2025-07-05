import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCustomer = async ({ nombre_fantasia, razon_social, RUT }) => {
  return prisma.customer.create({
    data: {
      nombre_fantasia,
      razon_social,
      RUT,
    },
  });
};

export const findAllCustomers = async () => {
  return prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
};

export const findCustomerByRUT = async (RUT) => {
  return prisma.customer.findUnique({ where: { RUT } });
};

export const updateCustomer = async (id, data) => {
  return prisma.customer.update({
    where: { id },
    data,
  });
};

export const deleteCustomer = async (id) => {
  return prisma.customer.delete({
    where: { id },
  });
};
