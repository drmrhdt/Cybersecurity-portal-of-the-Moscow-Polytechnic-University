'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

const hashPassword = bcrypt.hashSync('password', 10);

module.exports = {
  mockUsers: [
    {
      email: 'testadmin@mail.ru',
      name: 'Никита',
      surname: 'Петров',
      password: hashPassword,
    },
    {
      email: 'testivan@mail.ru',
      name: 'Иван',
      surname: 'Артемьев',
      password: hashPassword,
    },
    {
      email: 'testvasya@mail.ru',
      name: 'Василий',
      surname: 'Воронцов',
      password: hashPassword,
    },
  ],
};
