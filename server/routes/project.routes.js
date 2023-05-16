const express = require("express");
const { readJson, writeJson } = require("../utils/JSONReader");
/* const auth = require("../middleware/auth.middleware"); */

const router = express.Router({ mergeParams: true });

const filePath = "data/project.json";

// const url = "http://localhost:8080/api/project/:projectID?"

router
    .route("/:projectID?")
    .get(
        /* auth, */ async (req, res) => {
            try {
                const { projectID } = req.params;
                const data = [];
                res.send(data);
            } catch (error) {
                res.status(500).json({
                    message:
                        "Error occurred on the server. Please try again later",
                });
            }
        }
    )
    .post(
        /* auth, */ async (req, res) => {
            try {
                const { projectID } = req.params;
                const data = [];
                res.status(201).send(data);
            } catch (error) {
                res.status(500).json({
                    message:
                        "Error occurred on the server. Please try again later",
                });
            }
        }
    )
    .patch(
        /* auth, */ async (req, res) => {
            try {
                const { projectID } = req.params;
                const data = [];
                res.send(null);
            } catch (error) {
                res.status(500).json({
                    message:
                        "Error occurred on the server. Please try again later",
                });
            }
        }
    )
    .delete(
        /* auth, */ async (req, res) => {
            try {
                const { projectID } = req.params;
                const data = [];
                res.send(null);
            } catch (error) {
                res.status(500).json({
                    message:
                        "Error occurred on the server. Please try again later",
                });
            }
        }
    );

module.exports = router;
