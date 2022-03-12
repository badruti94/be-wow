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
    const books = [{
        title: 'Serangkai',
        publicationDate: '2018-05-05',
        pages: 400,
        author: 'Varelie Patkar',
        isbn: '9781789807510',
        about: 'Serangkai menceritakan berbagai macam hal',
        bookFile: 'serangkai.epub'
      },
      {
        title: 'Kabar Rahasia dari alam kubur',
        publicationDate: '2015-01-01',
        pages: 200,
        author: 'DR. Kamil Yusuf Al-Atum',
        isbn: '9781789807533',
        about: 'Menggambarkan rahasia alam kubur',
        bookFile: 'kabar-rahasia.epub'
      },
    ]
    await queryInterface.bulkInsert('books', books)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('books', null, {})
  }
};