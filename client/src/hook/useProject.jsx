import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsLoadingStatus, loadProjects } from "../store/projects";

const ProjectContext = React.createContext();

export const useProject = () => {
    return useContext(ProjectContext);
};

const ProjectProvider = ({ children }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getProjectsLoadingStatus())

    useEffect(() => {
        dispatch(loadProjects())
    }, [])

    return (
        <ProjectContext.Provider /* value={} */>
            {!isLoading && children}
        </ProjectContext.Provider>
    );
};

export default ProjectProvider;
