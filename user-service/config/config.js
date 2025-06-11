const dotenv = require('dotenv');

dotenv.config({ path: ".env" });

module.exports = {
  development: {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "developer",
    password: "12345abcde",
    database: "user_hr_app_1"
  }
}