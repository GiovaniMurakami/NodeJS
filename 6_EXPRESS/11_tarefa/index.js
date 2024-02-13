const express = require('express')
const app = express()
const port = 5000
const path = require('path')
const posts = require('./posts')

//Express lidando com dados do formulário
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

//Express utilizando o router posts
app.use('/posts', posts)

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, ()=>{
    console.log(`app running port ${port}`)
})
