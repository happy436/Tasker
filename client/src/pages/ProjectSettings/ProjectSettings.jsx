import ModalQuestion from "components/ui/common/ModalQuestion";
import { useProject } from "hook/useProject";
import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import history from "utils/history";

function ProjectSettings() {
    const {
        onActiveModalRemoveProject,
        activeModalRemoveProject,
        handleRemoveProject,
    } = useProject();
    const { projectID } = useParams();
    return (
        <main className="d-flex flex-column">
            <h3>Project settings</h3>
            <Button onClick={() => onActiveModalRemoveProject()}>Delete project</Button>
            {activeModalRemoveProject && (
                <ModalQuestion
                    active={activeModalRemoveProject}
                    hide={onActiveModalRemoveProject}
                    submit={() => {
                        handleRemoveProject(projectID);
                        history.push("/projects")
                    }}
                    title={"Confirm remove?"}
                    body={"Do you really want to remove this project?"}
                    titleButton={"Remove"}
                />
            )}
        </main>
    );
}

export default ProjectSettings;
