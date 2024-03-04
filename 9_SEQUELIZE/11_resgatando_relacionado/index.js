const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')
const Address = require('./models/Address')

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
    const user = await User.findOne({ include: Address, where: {id: id}})
    
    try {
        res.render('useredit', { user: user.get( { plain: true } ) })
    }catch(error){
        console.log(error)
    }
})

app.post('/users/update', async(req, res)=>{
    const id = parseInt(req.body.id)
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter
    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    const userData = {
        id: id,
        name: name,
        occupation: occupation,
        newsletter: newsletter
    }
    await User.update(userData, { where: { id:id } })
    res.redirect('/')
})

app.post('/address/create', async(req, res)=>{
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = { UserId, street, number, city }
    
    await Address.create(address)
    res.redirect(`/users/edit/${UserId}`)
})

app.get('/', async (req, res)=>{
    const users = await User.findAll({raw:true})
    res.render('home', { users })
})

conn.sync().then(()=>{
    app.listen(3000)
}).catch((err) => console.log(err))
