const Sequalize = require("sequelize");

const sequalize = require("../util/dataBase");

const UserData = sequalize.define("userdata", {
  id: {
    type: Sequalize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequalize.STRING,
  email: Sequalize.STRING,
});

module.exports = UserData;
