const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()
app.use(express.static('public'))
const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/', (req, res)=>{
    res.render('home')
})


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeMysql'
})
conn.connect(function(err){
    if (err){
        console.log(err)
        return
    }
    app.listen(3000, function(){
        console.log('App running')
    })
})
