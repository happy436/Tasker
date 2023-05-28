import { nanoid } from "nanoid";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	createProject,
	getProjectsLoadingStatus,
	loadProjects,
	removeProject
} from "store/projects";

const ProjectContext = React.createContext();

export const useProject = () => {
	return useContext(ProjectContext);
};

const ProjectProvider = ({ children }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector(getProjectsLoadingStatus());
	const [activeModalCreateProject, setActiveModalCreateProject] = useState(false);
	const [activeModalRemoveProject, setActiveModalRemoveProject] = useState(false);
	const [projectTitle, setProjectTitle] = useState("");
	const [projectVisibility, setProjectVisibility] = useState();

	const handleChangeProjectVisibility = (data) => {
		setProjectVisibility(data);
	};
	const handleCreateProject = () => {
		const data = {
			name: projectTitle,
			projectID: nanoid(),
			team: [],
			history: [],
			visibility: projectVisibility,
		};
		dispatch(createProject(data));
        onActiveModalCreateProject()
        onChangeModalTitle("")
        handleChangeProjectVisibility("")
	};

	const handleRemoveProject = (projectID) => {
		dispatch(removeProject(projectID))
		onActiveModalRemoveProject()
	}

	const onActiveModalCreateProject = () => {
		setActiveModalCreateProject(!activeModalCreateProject);
	};

	const onActiveModalRemoveProject = () => {
		setActiveModalRemoveProject(!activeModalRemoveProject)
	}

	const onChangeModalTitle = (data) => {
		setProjectTitle(data);
	};

	useEffect(() => {
		dispatch(loadProjects());
	}, []);

	return (
		<ProjectContext.Provider
			value={{
				handleCreateProject,
				onChangeModalTitle,
				projectTitle,
				projectVisibility,
				handleChangeProjectVisibility,
				activeModalCreateProject,
				onActiveModalCreateProject,
				onActiveModalRemoveProject,
				activeModalRemoveProject,
				handleRemoveProject
			}}
		>
			{!isLoading && children}
		</ProjectContext.Provider>
	);
};

export default ProjectProvider;
