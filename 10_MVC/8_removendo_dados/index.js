const express = require("express");
const app = express();

//DB
const conn = require("./db/conn");

//Models
const Tasks = require("./models/Task");

//Rotas
const tasksRoutes = require("./routes/taskRoutes");

//Handlebars config
const { engine } = require("express-handlebars");
app.set("views", "./views");

//Setando Handlebars como view engine
app.engine("handlebars", engine());
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
app.use("/tasks", tasksRoutes);

conn.sync().then(() => {
    app.listen(3000);
});
