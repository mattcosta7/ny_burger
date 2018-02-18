module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('TeamMembers', [
      {
        id: 1,
        firstName: 'Lev',
        lastName: 'Tobias',
        homeland: 'Juneau, Alaska',
        nickname: '',
        biography: '',
        paramName: 'lev-tobias',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        firstName: 'Bertrand',
        lastName: 'Vidal',
        homeland: 'Orleans, France',
        nickname: '',
        biography: '',
        paramName: 'bert-vidal',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        firstName: 'Matthew',
        lastName: 'Costabile',
        homeland: 'Valhalla, New York',
        nickname: '',
        biography: '',
        paramName: 'matthew-costabile',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('TeamMembers', null, {}),
};
