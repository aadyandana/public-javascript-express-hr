/* eslint-disable no-undef */
const dotenv = require('dotenv');

dotenv.config({ path: ".env" });

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || "developer",
    password: process.env.DB_PASSWORD || "12345abcde",
    database: process.env.DB_NAME || "payroll_hr_app_1",
  }
}