const express = require("express");
/* const auth = require("../middleware/auth.middleware"); */
const {
    addProject,
    getProject,
    updateProject,
    deleteProject,
} = require("../controllers/project.controller");

const router = express.Router({ mergeParams: true });

router.route("/").post(/* auth, */ addProject);
router
    .route("/:projectID?")
    .get(/* auth, */ getProject)
    .patch(/* auth, */ updateProject)
    .delete(/* auth, */ deleteProject);

module.exports = router;
