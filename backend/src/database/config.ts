// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
const environmentType = process.argv.find(
  (val) => val === 'development' || val === 'production',
);
dotenv.config({ path: `.${environmentType}.env` });

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRESS_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRESS_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
};
