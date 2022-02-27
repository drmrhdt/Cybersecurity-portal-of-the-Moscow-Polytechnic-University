/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mockRoles } = require('../mocks/roles');
const { mockUsers } = require('../mocks/users');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', mockRoles, {
      returning: true,
    });
    await queryInterface.bulkInsert('users', mockUsers, {
      returning: true,
    });
    let userRolesArr = [];
    const users = (
      await queryInterface.sequelize.query(`SELECT _id, email from users;`)
    )[0];
    const roles = (
      await queryInterface.sequelize.query(`SELECT _id, name from roles;`)
    )[0];
    users.forEach((val) => {
      if (val.email === 'testadmin@mail.ru') {
        userRolesArr.push(
          {
            role_id: roles.find((val) => val.name === 'admin')._id,
            user_id: val._id,
          },
          {
            role_id: roles.find((val) => val.name === 'user')._id,
            user_id: val._id,
          },
        );
      } else {
        userRolesArr.push({
          role_id: roles.find((val) => val.name === 'user')._id,
          user_id: val._id,
        });
      }
    });
    await queryInterface.bulkInsert('users_roles', userRolesArr, {
      returning: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users_roles', null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete('roles', null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete('users', null, {
      truncate: true,
      cascade: true,
    });
  },
};
