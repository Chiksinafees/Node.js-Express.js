const mysql=require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'sql-learning',
    password:'Nafees@123'
})

module.exports=pool.promise()