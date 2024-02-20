const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')

app.use(express.static('public'))

const products = [
    {
        id: 1,
        name: "Vassoura",
        price: 19.90,
    },
    {
        id: 2,
        name: "Rodo",
        price: 25.90,
    },
    {
        id: 3,
        name: "Pneu",
        price: 250.90,
    },
    {
        id: 4,
        name: "Lâmpada",
        price: 19.90,
    },
    {
        id: 5,
        name: "Carro",
        price: 25000,
    }
]

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/products/:id', (req, res) =>{
    product = products[req.params.id - 1]
    res.render('product', {product})
})

app.get('/', (req, res)=>{
    res.render('home', {products})
})

app.listen(3000, ()=>{
    console.log('App running')
})
