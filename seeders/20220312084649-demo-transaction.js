'use strict';

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
    const transactions = [{
        accountNumber: '12231231',
        transferProof: 'bca.png',
        expiredDate: '2022-03-11',
        paymentStatus: 'Pending',
        userId: 24
      },
      {
        accountNumber: '12231232',
        transferProof: 'bni.jpg',
        expiredDate: '2022-04-09',
        paymentStatus: 'Approved',
        userId: 31
      },
    ]
    await queryInterface.bulkInsert('transactions', transactions)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};