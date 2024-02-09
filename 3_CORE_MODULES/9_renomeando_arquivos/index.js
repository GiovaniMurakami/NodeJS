const fs = require('fs')

fs.rename('arquivo.txt', 'novoArquivo.txt', function(err){
    if(err){
        console.log(err)
    }

    console.log("Arquivo renomeado")
})