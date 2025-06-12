'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const hashedDefaultPassword = await bcrypt.hash('hr8743b52063cd84097a65d1633f5c74f5!', 12);
    const now = new Date();

    const users = [
      {
        id: uuidv4(),
        name: 'Admin',
        username: 'admin',
        password: hashedDefaultPassword,
        role: 0,
        created_at: now,
        updated_at: now,
      }
    ];

    for (let i = 1; i <= 100; i++) {
      users.push({
        id: uuidv4(),
        name: `Employee ${i}`,
        username: `employee${i}`,
        password: hashedDefaultPassword,
        role: 1,
        salary: Math.floor(Math.random() * 250) * 1000000,
        created_at: now,
        updated_at: now,
      })
    }

    await queryInterface.bulkInsert('users', users);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
