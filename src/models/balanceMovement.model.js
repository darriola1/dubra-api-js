import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createBalanceMovement = async ({ description, amount, customerId, invoiceId }) => {
  return prisma.balanceMovement.create({
    data: {
      description,
      amount,
      customerId,
      invoiceId,
    },
  });
};

export const findAllBalanceMovements = async () => {
  return prisma.balanceMovement.findMany({ orderBy: { createdAt: 'desc' } });
};

export const findBalanceMovementsByCustomer = async (customerId) => {
  return prisma.balanceMovement.findMany({
    where: { customerId },
    orderBy: { createdAt: 'desc' },
  });
};

export const findBalanceMovementById = async (id) => {
  return prisma.balanceMovement.findUnique({ where: { id } });
};

export const updateBalanceMovement = async (id, data) => {
  return prisma.balanceMovement.update({
    where: { id },
    data,
  });
};

export const deleteBalanceMovement = async (id) => {
  return prisma.balanceMovement.delete({
    where: { id },
  });
};
