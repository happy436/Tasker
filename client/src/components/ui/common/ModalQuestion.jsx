import React from "react";
import { Button, Modal } from "react-bootstrap";

function ModalQuestion({
    active,
    hide,
    submit,
    title,
    body,
    titleButton,
    colorButton = "danger",
}) {
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={active}
            onHide={hide}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => hide()}>
                    Close
                </Button>
                <Button variant={colorButton} onClick={() => submit()}>
                    {titleButton}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalQuestion;
