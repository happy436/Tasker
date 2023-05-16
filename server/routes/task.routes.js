const express = require("express");
const { readJson, writeJson } = require("../utils/JSONReader");
/* const auth = require("../middleware/auth.middleware"); */

const router = express.Router({ mergeParams: true });

const filePath = "data/task.json";

router
    .route("/board")
    .get(
        /* auth,  */ async (req, res) => {
            const { projectID } = req.params;
            try {
                const data = await readJson(filePath);
                const findedData = data.find(
                    (project) => project.projectID === projectID
                );
                res.send(
                    !findedData
                        ? { projectID: projectID, taskList: [] }
                        : findedData
                );
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
                const newTask = req.body;
                const data = await readJson(filePath);
                const findedData = data.find(
                    (project) => project.projectID === projectID
                );
                if (findedData) {
                    findedData.taskList.push(newTask);
                } else {
                    const newProject = { projectID: projectID, taskList: [] };
                    newProject.taskList.push(newTask);
                    data.push(newProject);
                }
                await writeJson(filePath, data);
                res.status(201).send(newTask);
            } catch (error) {
                res.status(500).json({
                    message:
                        "Error occurred on the server. Please try again later",
                });
            }
        }
    );

router
    .route("/board/:taskID?")
    .patch(
        /* auth, */ async (req, res) => {
            const { projectID, taskID } = req.params;
            const newTask = req.body;
            try {
                const data = await readJson(filePath);
                const updatedData = data.map((project) => {
                    if (project.projectID === projectID) {
                        const updatedTaskList = project.taskList.map((task) => {
                            if (task.taskID === taskID) {
                                return newTask;
                            }
                            return task;
                        });
                        return { ...project, taskList: updatedTaskList };
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
            try {
                const { projectID, taskID } = req.params;
                const data = await readJson(filePath);
                const findedProjectIndex = data.findIndex(
                    (item) => item.projectID === projectID
                );
                const findedProjectTaskIndex = data[
                    findedProjectIndex
                ].taskList.findIndex((item) => item.taskID === taskID);
                data[findedProjectIndex].taskList.splice(
                    findedProjectTaskIndex,
                    1
                );
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
