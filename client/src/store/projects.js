import { createSlice } from "@reduxjs/toolkit";
import projectService from "services/project.service";

const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        entities: [],
        activeProject: false,
        isLoading: true,
        error: null,
    },
    reducers: {
        setActiveProject: (state, action) => {
            state.activeProject = action.payload;
        },
        projectsRequested: (state) => {
            state.isLoading = true;
        },
        projectsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        projectsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addProject: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        deleteProject: (state, action) => {
            state.entities.splice(
                state.entities.findIndex(
                    (item) => item.projectID === action.payload
                ),
                1
            );
            state.isLoading = false;
        },
    },
});

const { reducer: projectsReducer, actions } = projectsSlice;
const {
    projectsRequested,
    projectsReceived,
    projectsRequestFailed,
    addProject,
    deleteProject,
    setActiveProject,
} = actions;

export const loadProjects = (userID) => async (dispatch) => {
    dispatch(projectsRequested());
    try {
        const data = await projectService.getProjects();
        dispatch(projectsReceived(data));
    } catch (error) {
        console.log(error);
    }
};
export const changeActiveProject = (projectID) => (dispatch) => {
    dispatch(setActiveProject(projectID));
};
export const createProject = (payload) => async (dispatch) => {
    dispatch(projectsRequested());
    try {
        const data = await projectService.createProject(payload);
        dispatch(addProject(data));
    } catch (error) {
        console.log(error);
    }
};
export const removeProject = (projectID) => async (dispatch) => {
    dispatch(projectsRequested());
    try {
        await projectService.delete(projectID)
        dispatch(deleteProject(projectID))
    } catch (error) {
        console.log(error);
    }
}
export const getActiveProject = () => (state) => state.projects.activeProject;
export const getProjects = () => (state) => state.projects.entities;
export const getProjectsLoadingStatus = () => (state) =>
    state.projects.isLoading;
export const getProjectByID = (id) => (state) => {
    if (state.projects.entities) {
        return state.projects.entities.find(
            (project) => project.projectID === id
        );
    }
    return null;
};

export default projectsReducer;
