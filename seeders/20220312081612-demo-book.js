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
        title: 'Tess On Road',
        author: 'Rachel Hariman',
        about: 'in the medieval kingdom there are',
        isbn: '9781789807554',
        publicationDate: '2020-04-04',
        pages: 302,
        bookFile: 'tess-on-road.epub'
      },
      {
        title: 'Serangkai',
        author: 'Varelie Patkar',
        about: 'Serangkai menceritakan berbagai macam hal',
        isbn: '9781789807510',
        publicationDate: '2018-05-05',
        pages: 400,
        bookFile: 'serangkai.epub'
      },
      {
        title: 'Kabar Rahasia dari alam kubur',
        author: 'DR. Kamil Yusuf Al-Atum',
        about: 'Menggambarkan rahasia alam kubur',
        isbn: '9781789807533',
        publicationDate: '2015-01-01',
        pages: 200,
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