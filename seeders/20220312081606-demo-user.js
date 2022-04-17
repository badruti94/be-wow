'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash('password', salt)
    const users = [{
        name: 'Admin0',
        email: 'admin@gmail.com',
        password: hashPassword,
        role: 'admin'
      },
      {
        name: 'spiderman',
        email: 'spiderman@gmail.com',
        password: hashPassword,
        role: 'user',
      },
      {
        name: 'Haris',
        email: 'haris@gmail.com',
        password: hashPassword,
        role: 'user',
      },
      {
        name: 'surti',
        email: 'surti@gmail.com',
        password: hashPassword,
        role: 'user',
      },
      {
        id: 22,
        name: 'Radif Ganteng',
        email: 'radifganteng@gmail.com',
        password: hashPassword,
        role: 'user',
      },
      {
        id: 24,
        name: 'Amin subagiyo',
        email: 'aminsubagiyo@gmail.com',
        password: hashPassword,
        role: 'user',
      },
      {
        id: 31,
        name: 'Haris Rahman',
        email: 'harisrahman@gmail.com',
        password: hashPassword,
        role: 'user',
      },
    ]
    await queryInterface.bulkInsert('users', users)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};