'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('roles', {
      _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },

  down: async (queryInterface) => {
    // const transaction = await queryInterface.sequelize.transaction();
    // await queryInterface.removeColumn('userRoles', 'roleId');
    await queryInterface.dropTable('roles');
    // await transaction.commit();
  },
};
