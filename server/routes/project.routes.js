const express = require("express");
const { readJson, writeJson } = require("../utils/JSONReader");
/* const auth = require("../middleware/auth.middleware"); */

const router = express.Router({ mergeParams: true });

const filePath = "data/project.json";

// const url = "http://localhost:8080/api/project/:projectID?"

router.route("/").post(
    /* auth, */ async (req, res) => {
        const newProject = req.body;
        try {
            const data = await readJson(filePath);
            data.push(newProject);
            await writeJson(filePath, data);
            res.status(201).send(newProject);
        } catch (error) {
            res.status(500).json({
                message: "Error occurred on the server. Please try again later",
            });
        }
    }
);

router
    .route("/:projectID?")
    .get(
        /* auth, */ async (req, res) => {
            const { projectID } = req.params;
            try {
                const data = await readJson(filePath);
                const findedData = data.find(
                    (project) => project.projectID === projectID
                );
                res.send(findedData);
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
            const { projectID } = req.params;
            const newData = req.body;
            try {
                const data = await readJson(filePath);
                const updatedData = data.map((project) => {
                    if (project.projectID === projectID) {
                        return newData;
                    }
                    return project;
                });
                await writeJson(filePath, updatedData);
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
            const { projectID } = req.params;
            try {
                const data = await readJson(filePath);
                const findedIndex = data.findIndex(
                    (project) => project.projectID === projectID
                );
                findedIndex && data.splice(findedIndex, 1);
                await writeJson(filePath, data);
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
