const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/TaskController");

router.get("/create", TaskController.createTask);
router.get("/", TaskController.showTasks);
router.get("/edit/:id", TaskController.updateTask);

router.post("/add", TaskController.saveTask);
router.post("/remove", TaskController.removeTask);
router.post("/edit", TaskController.updateTaskPost);

module.exports = router;
