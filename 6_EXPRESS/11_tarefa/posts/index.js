const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates')

//rota/posts/add
router.get('/add', (req, res)=>{
    res.sendFile(`${basePath}/formCreatePost.html`)
})

//rota/posts/save
router.post('/save', (req, res) => {
    const title = req.body.title
    const content = req.body.content
    console.log(`O nome do post é ${title} com o conteúdo ${content}`)
    res.sendFile(`${basePath}/formCreatePost.html`)
})

//rota/posts/*    -> essa rota só é chamada a partir do momento que nenhuma outra rota foi satisfeita
router.get('/:id', (req, res)=>{
    const id = req.params.id
    console.log(`Estamos buscando o post ${id}`)
    res.sendFile(`${basePath}/post.html`)
})

module.exports = router
