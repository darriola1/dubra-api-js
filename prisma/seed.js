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
  await prisma.shippingStatusHistory.deleteMany();
  await prisma.shipping.deleteMany();
  await prisma.balanceMovement.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.user.deleteMany();
  await prisma.customer.deleteMany();

  console.log('🌱 Iniciando seed...');

  const createdCustomers = [];
  for (const c of customers) {
    const cust = await prisma.customer.create({ data: c });
    createdCustomers.push(cust);
  }

  // Crear admins
  for (const a of admins) {
    const hashedPassword = bcrypt.hashSync(a.password, 10);
    await prisma.user.create({ data: { ...a, password: hashedPassword } });
  }

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

  const statuses = ["pendiente", "en_camino", "entregado", "cancelado"];
  let invoiceCounter = 1;

  for (const user of createdUsers) {
    const shippingCount = randomInt(1, 3);
    for (let s = 1; s <= shippingCount; s++) {
      // Crear movimiento financiero primero
      const movement = await prisma.balanceMovement.create({
        data: {
          description: `Movimiento asociado a INV-${invoiceCounter.toString().padStart(5, '0')}`,
          amount: invoiceCounter % 2 === 0
            ? randomInt(10, 99)  // pago
            : -randomInt(10, 99), // deuda
          amountAfter: 0,
          customerId: user.customerId,
          createdAt: new Date(),
          estado: invoiceCounter % 2 === 0 ? 'approved' : 'pending' // ejemplo de estado
        }
      });

      // Crear invoice con referencia al movimiento
      const invoice = await prisma.invoice.create({
        data: {
          number: `INV-${invoiceCounter.toString().padStart(5, '0')}`,
          customerId: user.customerId,
          createdAt: new Date(),
          movementId: movement.id
        }
      });

      // Crear shipping
      const shipping = await prisma.shipping.create({
        data: {
          fromAddress: `Almacén Central ${user.customerId}`,
          toAddress: `Dirección Cliente ${user.id}-${s}`,
          contactName: user.name,
          contactPhone: `0999${1000 + s}`,
          trackingId: `DUB-${invoiceCounter.toString().padStart(6, '0')}`,
          status: statuses[randomInt(0, statuses.length - 1)],
          createdAt: new Date(),
          updatedAt: new Date(),
          invoiceId: invoice.id,
          userId: user.id
        }
      });

      // Crear historial de estado
      await prisma.shippingStatusHistory.create({
        data: {
          shippingId: shipping.id,
          status: 'pendiente',
          changedAt: new Date()
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
