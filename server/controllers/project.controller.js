const { readData, writeData } = require("../utils/JSONReader");

const projectPath = "data/project.json";
const taskPath = "data/task.json";
const errorMessage = "Error occurred on the server. Please try again later";

async function addProject(req, res) {
    const newProject = req.body;
    try {
        const data = await readData(projectPath);
        data.push(newProject);
        await writeData(projectPath, data);
        res.status(201).send(newProject);
    } catch (error) {
        res.status(500).json({ message: errorMessage });
    }
}

async function getProject(req, res) {
    const { projectID } = req.params;
    try {
        const data = await readData(projectPath);
        const foundProject = data.find(
            (project) => project.projectID === projectID
        );
        res.send(foundProject);
    } catch (error) {
        res.status(500).json({ message: errorMessage });
    }
}

async function updateProject(req, res) {
    const { projectID } = req.params;
    const newData = req.body;
    try {
        const data = await readData(projectPath);
        const updatedData = data.map((project) =>
            project.projectID === projectID ? newData : project
        );
        await writeData(projectPath, updatedData);
        res.send(null);
    } catch (error) {
        res.status(500).json({ message: errorMessage });
    }
}

async function deleteProject(req, res) {
    const { projectID } = req.params;
    try {
        const projectsData = await readData(projectPath);
        const findIndexCallBack = (project) => project.projectID === projectID;
        const foundProjectIndex = projectsData.findIndex(findIndexCallBack);

        if (foundProjectIndex !== -1) {
            projectsData.splice(foundProjectIndex, 1);
            await writeData(projectPath, projectsData);
        }

        const tasksData = await readData(taskPath);
        const foundTaskIndex = tasksData.findIndex(findIndexCallBack);

        if (foundTaskIndex !== -1) {
            tasksData.splice(foundTaskIndex, 1);
            await writeData(taskPath, tasksData);
        }

        res.send(null);
    } catch (error) {
        res.status(500).json({ message: errorMessage });
    }
}

module.exports = { addProject, getProject, updateProject, deleteProject };
