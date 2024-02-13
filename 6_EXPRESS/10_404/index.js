const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const users = require('./users')

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.use(express.static('public'))

const basePath = path.join(__dirname, 'templates')

app.use('/users', users)

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`)
})

//renderizar página 404
app.use(function(req,res, next){
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, ()=>{
    console.log(`app running port ${port}`)
})
