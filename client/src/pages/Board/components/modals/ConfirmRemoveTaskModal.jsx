import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTask } from "hook/useTask";
import { useParams } from "react-router-dom";

function ConfirmRemoveTaskModal() {
    const {
        activeConfirmRemoveTaskModal,
        handleShowConfirmRemoveTaskModal,
        handleConfirmRemoveTask,
    } = useTask();
    const { projectID } = useParams();
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={activeConfirmRemoveTaskModal}
            onHide={handleShowConfirmRemoveTaskModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm remove?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to remove this task?</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => handleShowConfirmRemoveTaskModal()}
                >
                    Close
                </Button>
                <Button
                    variant="danger"
                    onClick={() => handleConfirmRemoveTask(projectID)}
                >
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmRemoveTaskModal;
