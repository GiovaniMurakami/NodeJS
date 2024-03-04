const express = require("express");
const app = express();

//DB
const conn = require("./db/conn");

//Models
const Task = require("./models/Task");

//Rotas
const taskRoutes = require("./routes/taskRoutes");

//Handlebars config
const exphbs = require("express-handlebars");
const hbs = exphbs.create({
    partialsDir: ["views/partials"],
});
//Setando Handlebars como view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Utilizando a pasta de arquivos estáticos
app.use(express.static("public"));

//body parser (responsável por recuperar dados do formulário HTML)
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

//MiddleWares
app.use("/task", taskRoutes);

conn.sync().then(() => {
    app.listen(3000);
});
