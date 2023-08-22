const Sequelize = require("sequelize"); // give class or constructor function

const sequelize = new Sequelize("sql-learning", "root", "Nafees@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
