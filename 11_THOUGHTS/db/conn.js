const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("thoughts", "root", "Murakam1@", {
    host: "localhost",
    dialect: "mysql",
});

try {
    sequelize.authenticate();
    console.log("mysql ok");
} catch (err) {
    console.log("mysql not ok");
}

module.exports = sequelize;
