const express = require("express");
const {
    getTaskBoard,
    addTask,
    updateTask,
    deleteTask,
} = require("../controllers/task.controller");

const router = express.Router({ mergeParams: true });

router.route("/board").get(getTaskBoard).post(addTask);
router.route("/board/:taskID?").patch(updateTask).delete(deleteTask);

module.exports = router;
