import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTask } from "hook/useTask";
import EditParagraphsList from "./EditParagraphsList";
import { useParams } from "react-router-dom";

function EditTaskModal() {
    const {
        activeEditModalTask,
        modalTitle,
        changeModalTitle,
        onActiveModal,
        editTask,
        editCriticalStatus,
        criticalStatus,
        colorEditTask,
        editColor,
    } = useTask();
    const { projectID } = useParams();
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={activeEditModalTask}
            onHide={() => onActiveModal(null, "edit")}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <label
                        htmlFor="recipient-name"
                        className="col-form-label d-none"
                    >
                        Title:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        autoComplete="off"
                        value={modalTitle}
                        onChange={(e) => changeModalTitle(e)}
                    ></input>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column">
                    <EditParagraphsList />
                    <button
                        style={{ width: "200px", alignSelf: "center" }}
                        className={`alert alert-${colorEditTask} text-center task`}
                        onClick={() => editColor(colorEditTask)}
                    >
                        {colorEditTask}
                    </button>
                    {/* <div className="mb-3">
                        <label
                            htmlFor="recipient-name"
                            className="col-form-label"
                        >
                            Comment:
                        </label>
                        <input
                            type="text" 
                            className="form-control"
                            id="recipient-name"
                            value={""}
                            autoComplete="off"
                            onChange={() => {}}
                        ></input>
                    </div> */}
                    <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic checkbox toggle button group"
                    >
                        <input
                            type="checkbox"
                            className="btn-check"
                            id="btncheck1"
                            value=""
                            checked={criticalStatus}
                            onChange={() => {
                                editCriticalStatus();
                            }}
                        />
                        <label
                            className="btn btn-outline-danger"
                            htmlFor="btncheck1"
                        >
                            Add critical status
                        </label>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => onActiveModal(null, "edit")}
                >
                    Close
                </Button>
                <Button variant="primary" onClick={() => editTask(projectID)}>
                    Edit task
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditTaskModal;
