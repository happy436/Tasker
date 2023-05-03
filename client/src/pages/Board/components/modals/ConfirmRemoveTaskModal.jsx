import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTask } from "../../../../hook/useTask";

function ConfirmRemoveTaskModal() {
    const {
        activeConfirmRemoveTaskModal,
        handleShowConfirmRemoveTaskModal,
        handleConfirmRemoveTask,
    } = useTask();
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
                    onClick={() => handleConfirmRemoveTask()}
                >
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmRemoveTaskModal;
