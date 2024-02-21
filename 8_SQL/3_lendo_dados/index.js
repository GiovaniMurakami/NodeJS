const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()
app.use(express.static('public'))
const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/books', (req, res)=>{
    const query = `SELECT * FROM books`
    conn.query(query, function(err, data){
        if (err){
            console.log(err)
            return
        }
        const books = data
        res.render('books', {books})
    })
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pagesqty = parseInt(req.body.pagesqty)
    const query = `INSERT INTO books (title, pagesqty) VALUES ('${title}', '${pagesqty}')`
    conn.query(query, function(err){
        if (err){
            console.log(err)
        }
        res.redirect('/books')
    })
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
