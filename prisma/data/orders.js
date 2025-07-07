function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Solo usuarios con rol "user": IDs del 4 al 18 (3 admins + 15 users)
const userIds = Array.from({ length: 15 }, (_, i) => i + 4);

const orders = [];
let orderId = 1;

userIds.forEach(userId => {
  const count = randomInt(1, 3);
  for (let i = 1; i <= count; i++) {
    orders.push({
      description: `Pedido ${i} para usuario ${userId}`,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    orderId++;
  }
});

exports.orders = orders;
