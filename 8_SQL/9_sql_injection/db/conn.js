const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Murakam1@',
    database: 'nodeMysql'
})

module.exports = pool