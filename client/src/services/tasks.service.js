import axios from "axios"
import configFile from "config.test.json"

const httpService = configFile.apiEndPoint;


const taskService = {
    getTasks: async (projectID) => {
        const { data } = await axios.get(
            httpService + `project/${projectID}/board`
        );
        return data;
    },
    createTask: async (payload, projectID) => {
        const { data } = await axios.post(
            httpService + `project/${projectID}/board`,
            payload
        );
        return data;
    },
    update: async (payload, projectID, taskID) => {
        const data = await axios.patch(
            httpService + `project/${projectID}/board/${taskID}`,
            payload
        );
        return data;
    },
    delete: async (projectID, taskID) => {
        const data = await axios.delete(
            httpService + `project/${projectID}/board/${taskID}`
        );
        return data
    },
};

export default taskService;
