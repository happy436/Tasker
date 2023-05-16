const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/project/:projectID?", require("./task.routes"));
router.use("/project", require("./project.routes"));
router.use("/projects", require("./projects.routes"));

module.exports = router;
