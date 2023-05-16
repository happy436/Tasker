import axios from "axios";
import configFile from "config.test.json";

const httpService = configFile.apiEndPoint;
/* for get all projects */
const projectsEndPoint = "projects/";
/* for project */
const projectEndPoint = "project/";

const projectService = {
    getProjects: async () => {
        const { data } = await axios.get(httpService + projectsEndPoint);
        
        return data;
    },
    createProject: async (payload, projectID) => {
        const { data } = await axios.post(
            httpService + projectEndPoint + projectID, payload
        );
    },
};

export default projectService
