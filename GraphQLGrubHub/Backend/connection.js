const mysql = require('mysql')
let pool = mysql.createPool({
  connectionLimit: 5000,
  port: '3306',
  host: 'localhost',
  user: 'root',
  database: 'grubhub',
  password: 'password'
})


module.exports = pool;