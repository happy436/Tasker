import React, { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getProjects,
    getProjectsLoadingStatus,
    changeActiveProject,
} from "store/projects";
import history from "utils/history";
import ProjectModal from "./components/modals/ProjectModal";

function Projects() {
    const dispatch = useDispatch();
    const projects = useSelector(getProjects());
    const isLoading = useSelector(getProjectsLoadingStatus());

    const [activeProject, setActiveProject] = useState(null);
    const [activeModal, setActiveModal] = useState(false);

    function fetchTaskList(projectID) {
        dispatch(changeActiveProject(projectID));
    }

    return (
        <main className="d-flex flex-column p-3 gap-3 px-5">
            <h1>Projects</h1>
            <div>
                <Button onClick={() => setActiveModal(true)}>
                    Add project
                </Button>
            </div>
            <ListGroup as="ul">
                {projects.length !== 0 && !isLoading
                    ? projects.map((project) => (
                          <ListGroup.Item
                              active={activeProject === project.projectID}
                              onMouseEnter={() =>
                                  setActiveProject(project.projectID)
                              }
                              onMouseLeave={() => setActiveProject(null)}
                              onClick={(e) => {
                                  history.push(`/project/${project.projectID}`);
                              }}
                              key={project.projectID}
                              as="li"
                              className="d-flex pointer justify-content-between align-items-center"
                          >
                              <h5>{project.name}</h5>
                              <Link
                                  to={`/project/${project.projectID}/board`}
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      fetchTaskList(project.projectID);
                                  }}
                              >
                                  <Button variant="danger">Board</Button>
                              </Link>
                          </ListGroup.Item>
                      ))
                    : "Empty"}
            </ListGroup>
            {activeModal && (
                <ProjectModal
                    active={activeModal}
                    setActive={() => setActiveModal(!activeModal)}
                />
            )}
        </main>
    );
}

export default Projects;
