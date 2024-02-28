const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

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
    pool.query(query, function(err, data){
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
    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title', 'pagesqty', title, pagesqty]
    pool.query(sql, data, function(err){
        if (err){
            console.log(err)
        }
        res.redirect('/books')
    })
})

app.get('/books/:id', (req, res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE ?? = ?`
    data = ['id', id]
    pool.query(sql, data, function(err, data){
        if (err){
            console.log(err)
            return
        }
        const book = data[0]
        res.render('book', {book})
    })
})

app.get('/book/edit/:id', (req, res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE ?? = ?`
    data = ['id', id]
    pool.query(sql, data, function(err, data){
        if (err){
            console.log(err)
            return
        }
        const book = data[0]
        res.render('editbook', {book})
    })
})

app.post('/book/updatebook', (req, res)=>{
    const id = req.body.id
    const title = req.body.title
    const pagesqty = req.body.pagesqty
    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    data = ['title', title, 'pagesqty', pagesqty, 'id', id]
    pool.query(sql, data, function(err){
        if (err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.post('/book/remove/:id', (req, res)=>{
    id = req.params.id
    const sql = `DELETE FROM books WHERE ?? = ?`
    data = ['id', id]
    pool.query(sql, data, function(err){
        if (err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.listen(3000, function(){
    console.log('App running')
})
