const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res)=>{
    res.send('Olá Express')
})

app.listen(port, ()=>{
    console.log(`app running port ${port}`)
})