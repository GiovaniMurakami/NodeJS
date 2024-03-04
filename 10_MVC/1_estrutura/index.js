const express = require("express");
const exphbs = require("express-handlebars");

//DB
const conn = require("./db/conn");

const app = express();

const hbs = exphbs.create({
    partialsDir: ["views/partials"],
});
//body parser (responsável por recuperar dados do formulário HTML)
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

//Utilizando a pasta de arquivos estáticos
app.use(express.static("public"));

//Setando Handlebars como view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.listen(3000);
