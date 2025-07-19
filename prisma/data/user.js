exports.users = [
  // 3 admins sin customerId
  { email: "admin1@empresa.com", name: "Admin Uno", password: "hashed_admin1", role: "admin", updatedAt: new Date() },
  { email: "admin2@empresa.com", name: "Admin Dos", password: "hashed_admin2", role: "admin", updatedAt: new Date() },
  { email: "admin3@empresa.com", name: "Admin Tres", password: "hashed_admin3", role: "admin", updatedAt: new Date() },

  // 5 users para customer 1 (customerId = 1)
  { email: "user1a@cliente1.com", name: "User 1A", password: "hashed_user1a", customerId: 1, role: "user", updatedAt: new Date() },
  { email: "user1b@cliente1.com", name: "User 1B", password: "hashed_user1b", customerId: 1, role: "user", updatedAt: new Date() },
  { email: "user1c@cliente1.com", name: "User 1C", password: "hashed_user1c", customerId: 1, role: "user", updatedAt: new Date() },
  { email: "user1d@cliente1.com", name: "User 1D", password: "hashed_user1d", customerId: 1, role: "user", updatedAt: new Date() },
  { email: "user1e@cliente1.com", name: "User 1E", password: "hashed_user1e", customerId: 1, role: "user", updatedAt: new Date() },

  // 5 users para customer 2 (customerId = 2)
  { email: "user2a@cliente2.com", name: "User 2A", password: "hashed_user2a", customerId: 2, role: "user", updatedAt: new Date() },
  { email: "user2b@cliente2.com", name: "User 2B", password: "hashed_user2b", customerId: 2, role: "user", updatedAt: new Date() },
  { email: "user2c@cliente2.com", name: "User 2C", password: "hashed_user2c", customerId: 2, role: "user", updatedAt: new Date() },
  { email: "user2d@cliente2.com", name: "User 2D", password: "hashed_user2d", customerId: 2, role: "user", updatedAt: new Date() },
  { email: "user2e@cliente2.com", name: "User 2E", password: "hashed_user2e", customerId: 2, role: "user", updatedAt: new Date() },

  // 5 users para customer 3 (customerId = 3)
  { email: "user3a@cliente3.com", name: "User 3A", password: "hashed_user3a", customerId: 3, role: "user", updatedAt: new Date() },
  { email: "user3b@cliente3.com", name: "User 3B", password: "hashed_user3b", customerId: 3, role: "user", updatedAt: new Date() },
  { email: "user3c@cliente3.com", name: "User 3C", password: "hashed_user3c", customerId: 3, role: "user", updatedAt: new Date() },
  { email: "user3d@cliente3.com", name: "User 3D", password: "hashed_user3d", customerId: 3, role: "user", updatedAt: new Date() },
  { email: "user3e@cliente3.com", name: "User 3E", password: "hashed_user3e", customerId: 3, role: "user", updatedAt: new Date() }
];
