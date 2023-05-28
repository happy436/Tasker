const { readJson, writeJson } = require("../utils/JSONReader");

const filePath = "data/task.json";
const errorMessage = "Error occurred on the server. Please try again later";

async function getTaskBoard(req, res) {
    const { projectID } = req.params;
    try {
        const data = await readJson(filePath);
        const foundData = data.find(
            (project) => project.projectID === projectID
        );
        const taskList = foundData ? foundData.taskList : [];
        const responseData = {
            projectID: projectID,
            taskList: taskList,
        };
        res.send(responseData);
    } catch (error) {
        res.status(500).json({ message: errorMessage });
    }
}

async function addTask(req, res) {
    const { projectID } = req.params;
    const newTask = req.body;
    try {
        const data = await readJson(filePath);
        const findedData = data.find(
            (project) => project.projectID === projectID
        );
        if (findedData) {
            findedData.taskList.push(newTask);
        } else {
            const newProject = { projectID: projectID, taskList: [newTask] };
            data.push(newProject);
        }
        await writeJson(filePath, data);
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).json({ message: errorMessage });
    }
}

async function updateTask(req, res) {
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
        res.status(500).json({ message: errorMessage });
    }
}

async function deleteTask(req, res) {
    const { projectID, taskID } = req.params;
    try {
        const data = await readJson(filePath);
        const foundProjectIndex = data.findIndex(
            (item) => item.projectID === projectID
        );
        if (foundProjectIndex !== -1) {
            const taskList = data[foundProjectIndex].taskList;
            const foundTaskIndex = taskList.findIndex(
                (item) => item.taskID === taskID
            );
            if (foundTaskIndex !== -1) {
                taskList.splice(foundTaskIndex, 1);
                await writeJson(filePath, data);
            }
        }
        res.send(null);
    } catch (error) {
        res.status(500).json({ message: errorMessage });
    }
}

module.exports = { getTaskBoard, addTask, updateTask, deleteTask };
