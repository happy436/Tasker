import ModalQuestion from "components/ui/common/ModalQuestion";
import { useProject } from "hook/useProject";
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import history from "utils/history";

function ProjectSettings() {
    const {
        onActiveModalRemoveProject,
        activeModalRemoveProject,
        handleRemoveProject,
    } = useProject();
    const { projectID } = useParams();
    const list = [
        { onClick: () => onActiveModalRemoveProject(), name: "Delete project" },
    ];
    return (
        <main className="d-flex flex-column p-3">
            <h3>Project settings</h3>
            <nav>
                <ButtonGroup className="gap-3" as="ul">
                    {list.map((button) => (
                        <Button key={button.name} onClick={button.onClick}>
                            {button.name}
                        </Button>
                    ))}
                </ButtonGroup>
            </nav>
            {activeModalRemoveProject && (
                <ModalQuestion
                    active={activeModalRemoveProject}
                    hide={onActiveModalRemoveProject}
                    submit={() => {
                        handleRemoveProject(projectID);
                        history.push("/projects");
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
