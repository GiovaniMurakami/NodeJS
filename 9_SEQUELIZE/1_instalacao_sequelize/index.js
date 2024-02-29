const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const app = express()
app.use(express.static('public'))
const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

//body parser
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/', (req, res)=>{
    res.render('home')
})

app.listen(3000)
