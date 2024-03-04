const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')

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

app.get("/users/create", async (req, res)=>{
    res.render('adduser')
})

app.post('/users/create', async (req, res)=>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    } else {
        newsletter = false
    }
    await User.create({ name, occupation, newsletter })
    res.redirect('/')
})

app.get('/users/:id', async(req, res) =>{
    id = req.params.id
    const user = await User.findOne({ raw: true, where: {id: id}})
    res.render('userview', { user })
})

app.post('/users/delete/:id', (req, res)=>{
    id = req.params.id
    User.destroy({where:{id:id}})
    res.redirect('/')
})

app.get('/users/edit/:id', async(req, res) =>{
    id = req.params.id
    const user = await User.findOne({ raw: true, where: {id: id}})
    res.render('useredit', { user })
})

app.get('/', async (req, res)=>{
    const users = await User.findAll({raw:true})
    res.render('home', { users })
})

conn.sync().then(()=>{
    app.listen(3000)
}).catch((err) => console.log(err))