import React from "react";
import { Button, Form, Modal, Dropdown } from "react-bootstrap";
import { UilBookAlt, UilPadlock } from "@iconscout/react-unicons";

function ProjectModal({ active, setActive }) {
    return (
        <Modal
            show={active}
            onHide={setActive}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton><h4>Create project</h4></Modal.Header>
            <Modal.Body className="d-flex flex-column gap-3">
                <Form.Group>
                    <Form.Label><b>Project Title</b></Form.Label>
                    <Form.Control
                        placeholder="Title"
                        aria-describedby="basic-addon1"
                        autoFocus
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="projectStatus">
                    <Form.Label><b>Project visibility</b></Form.Label>
                    <Form.Check type="radio">
                        <Form.Check.Input type="radio" name="group1" />
                        <Form.Check.Label className="d-flex gap-1">
                            <UilBookAlt />
                            Public
                        </Form.Check.Label>
                    </Form.Check>
                    <Form.Check type="radio">
                        <Form.Check.Input type="radio" name="group1" />
                        <Form.Check.Label className="d-flex gap-1">
                            <UilPadlock />
                            Privat
                        </Form.Check.Label>
                    </Form.Check>
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={setActive}>Close</Button>
                <Button>Add project</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProjectModal;
