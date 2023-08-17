const Sequalize = require("sequelize");

const sequelize = require("../util/dataBase"); //database connection pool / fully configured sequalized environment+ all feature of sequalized package

const Product = sequelize.define("product", {
  id: {
    type: Sequalize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequalize.STRING,
  imageUrl: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequalize.DOUBLE,
    allowNull: false,
  },

  description: {
    type: Sequalize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
