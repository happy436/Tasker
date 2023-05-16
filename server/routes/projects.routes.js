const express = require("express");
const { readJson, writeJson } = require("../utils/JSONReader");
/* const auth = require("../middleware/auth.middleware"); */

const router = express.Router({ mergeParams: true });

const filePath = "data/project.json";

// const url = "http://localhost:8080/api/projects/"

router
    .route("/")
    .get(
    /* auth, */ async (req, res) => {
        try {
            const data = await readJson(filePath);
            console.log(data)
            res.send(data);
        } catch (error) {
            res.status(500).json({
                message: "Error occurred on the server. Please try again later",
            });
        }
    }
);

module.exports = router;