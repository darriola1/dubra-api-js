import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (userData) => {
  return prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "user", // Default role is 'user'
    },
  });
};

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserByid = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUserPassword = async (email, newPassword) => {
  return prisma.user.update({
    where: { email },
    data: { password: newPassword },
  });
};
