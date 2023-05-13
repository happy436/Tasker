import { nanoid } from "nanoid";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	createProject,
	getProjectsLoadingStatus,
	loadProjects,
} from "store/projects";

const ProjectContext = React.createContext();

export const useProject = () => {
	return useContext(ProjectContext);
};

const ProjectProvider = ({ children }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector(getProjectsLoadingStatus());
	const [activeModal, setActiveModal] = useState(false);
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
			visilibity: projectVisibility,
		};
		dispatch(createProject(data));
        onActiveModal()
        onChangeModalTitle("")
        handleChangeProjectVisibility("")
	};

	const onActiveModal = () => {
		setActiveModal(!activeModal);
	};

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
				activeModal,
				onActiveModal,
			}}
		>
			{!isLoading && children}
		</ProjectContext.Provider>
	);
};

export default ProjectProvider;
