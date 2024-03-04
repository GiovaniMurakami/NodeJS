const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("NodeMVC", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

try {
    sequelize.authenticate();
    console.log("mysql ok");
} catch (error) {
    console.log(error);
}

exports.default = sequelize;
