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

export const findUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    return user;
  } catch (err) {
    console.error("Error en la consulta de usuario:", err);
    throw new Error('No se pudo encontrar el usuario');
  }
};

export const updateUserPassword = async (email, newPassword) => {
  return prisma.user.update({
    where: { email },
    data: { password: newPassword },
  });
};
