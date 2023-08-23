const Sequelize = require("sequelize");

const sequelize = require("../util/dataBase");

const CartItems = sequelize.define("cartItems", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItems;
