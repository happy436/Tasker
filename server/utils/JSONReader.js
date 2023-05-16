const fs = require("fs");

function readJson(filePath) {
    let fileDescriptor;
    try {
        fileDescriptor = fs.openSync(filePath, "r");
        const jsonData = fs.readFileSync(fileDescriptor, "utf8");
        const data = JSON.parse(jsonData);
        console.log("JSON file has been read successfully.");
        return data;
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return null;
    } finally {
        if (fileDescriptor) {
            fs.closeSync(fileDescriptor);
        }
    }
}

function writeJson(filePath, data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonData, "utf8");
        console.log("JSON file has been written successfully.");
    } catch (error) {
        console.error("Error writing JSON file:", error);
    }
}

module.exports = { readJson, writeJson };
