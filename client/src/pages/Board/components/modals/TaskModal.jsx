import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTask } from "../../../../hook/useTask";
import ParagraphsList from "./EditParagraphsList";

function TaskModal() {
    const {
        modalTitle,
        changeModalTitle,
        onCreateTask,
        activeModal,
        onActiveModal,
    } = useTask();

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={activeModal}
            onHide={onActiveModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column">
                    <label htmlFor="recipient-name" className="col-form-label">
                        Title:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        value={modalTitle}
                        onChange={(e) => changeModalTitle(e)}
                    ></input>
                    <ParagraphsList />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onActiveModal()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onCreateTask()}>
                    Add task
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskModal;
