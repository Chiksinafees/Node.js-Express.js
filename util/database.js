// const mysql=require('mysql2')

// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'sql-learning',
//     password:'Nafees@123'
// })

// module.exports=pool.promise()

const Sequelize = require("sequelize"); // give class or constructor function

const sequelize = new Sequelize("sql-learning", "root", "Nafees@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
