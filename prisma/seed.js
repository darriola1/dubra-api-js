// prisma/seed.js

import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const customers = [
  { nombre_fantasia: "Cliente Uno", razon_social: "Cliente Uno SRL", RUT: "100000001", updatedAt: new Date() },
  { nombre_fantasia: "Cliente Dos", razon_social: "Cliente Dos S.A.", RUT: "100000002", updatedAt: new Date() },
  { nombre_fantasia: "Cliente Tres", razon_social: "Cliente Tres Ltda", RUT: "100000003", updatedAt: new Date() }
];

const admins = [
  { email: "admin1@empresa.com", name: "Admin Uno", password: "adminPassword", role: "admin", updatedAt: new Date() },
  { email: "admin2@empresa.com", name: "Admin Dos", password: "adminPassword", role: "admin", updatedAt: new Date() },
  { email: "admin3@empresa.com", name: "Admin Tres", password: "adminPassword", role: "admin", updatedAt: new Date() }
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log('🌱 Seed empezando...');

  // 1) Insertar customers
  const createdCustomers = [];
  for (const c of customers) {
    const cust = await prisma.customer.create({ data: c });
    createdCustomers.push(cust);
  }

  // 2) Insertar admins con password hasheado
  for (const a of admins) {
    const hashedPassword = bcrypt.hashSync(a.password, 10);
    await prisma.user.create({ data: { ...a, password: hashedPassword } });
  }

  // 3) Insertar users (5 por cada customer) con password hasheado
  const createdUsers = [];
  for (const cust of createdCustomers) {
    for (let i = 1; i <= 5; i++) {
      const plainPassword = `user${i}@${cust.nombre_fantasia.toLowerCase().replace(/\s/g, '')}`;
      const hashedPassword = bcrypt.hashSync(plainPassword, 10);

      const user = await prisma.user.create({
        data: {
          email: `user${i}@${cust.nombre_fantasia.toLowerCase().replace(/\s/g, '')}.com`,
          name: `User ${i} de ${cust.nombre_fantasia}`,
          password: hashedPassword,
          role: 'user',
          customerId: cust.id,
          updatedAt: new Date()
        }
      });
      createdUsers.push(user);
    }
  }

  // 4) Crear orders, shippings, historial, invoices y movimientos por cada user
  const statuses = ["pendiente", "en_camino", "entregado", "cancelado"];

  let invoiceCounter = 1;

  for (const user of createdUsers) {
    const orderCount = randomInt(1, 3);
    for (let o = 1; o <= orderCount; o++) {
      // Crear order
      const order = await prisma.order.create({
        data: {
          description: `Pedido ${o} para ${user.email}`,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      // Crear shipping
      await prisma.shipping.create({
        data: {
          orderId: order.id,
          fromAddress: `Almacén Principal ${user.customerId}`,
          toAddress: `Dirección cliente pedido ${order.id}`,
          contactName: user.name,
          contactPhone: `0999${1000 + order.id}`,
          trackingId: `TRACK${order.id.toString().padStart(6, '0')}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      // Crear shippingStatusHistory
      await prisma.shippingStatusHistory.create({
        data: {
          orderId: order.id,
          status: 'pendiente',
          changedAt: new Date()
        }
      });

      // Crear invoice
      const invoice = await prisma.invoice.create({
        data: {
          number: `INV-${invoiceCounter.toString().padStart(5, '0')}`,
          fileBase64: Buffer.from(`Factura ${invoiceCounter}`).toString('base64'),
          customerId: user.customerId,
          createdAt: new Date()
        }
      });

      // Actualizar order con invoiceId
      await prisma.order.update({
        where: { id: order.id },
        data: { invoiceId: invoice.id }
      });

      // Crear balanceMovement
      await prisma.balanceMovement.create({
        data: {
          description: `Movimiento para factura INV-${invoiceCounter.toString().padStart(5, '0')}`,
          amount: invoiceCounter % 2 === 0 ? 15000 : -7500,
          customerId: user.customerId,
          invoiceId: invoice.id,
          createdAt: new Date()
        }
      });

      invoiceCounter++;
    }
  }

  console.log('✅ Seed completado con éxito.');
}

main()
  .catch(e => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
