const express = require("express");
const { getProjects } = require("../controllers/projects.controller");
/* const auth = require("../middleware/auth.middleware"); */

const router = express.Router({ mergeParams: true });

router.route("/").get(/* auth, */ getProjects);

module.exports = router;
