import { createSlice } from "@reduxjs/toolkit";
import { projects } from "./data.test";

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
    },
});

const { reducer: projectsReducer, actions } = projectsSlice;
const {
    projectsRequested,
    projectsReceived,
    projectsRequestFailed,
    setActiveProject,
} = actions;

export const loadProjects = (userID) => async (dispatch) => {
    dispatch(projectsRequested());
    try {
        const data = projects;
        dispatch(projectsReceived(data));
    } catch (error) {
        console.log(error);
    }
};
export const changeActiveProject = (projectID) => (dispatch) => {
    dispatch(setActiveProject(projectID));
};
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
    return null
};

export default projectsReducer;
