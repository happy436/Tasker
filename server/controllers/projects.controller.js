const { readJson } = require("../utils/JSONReader");

const filePath = "data/project.json";
const errorMessage = "Error occurred on the server. Please try again later";

async function getProjects(req, res) {
    try {
        const data = await readJson(filePath);
        res.send(data);
    } catch (error) {
        res.status(500).json({
            message: errorMessage,
        });
    }
}

module.exports = { getProjects };
