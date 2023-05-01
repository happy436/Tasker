import React from "react";
import Modal from "../../../components/ui/common/Modal";
import { useTask } from "../../../hook/useTask";

function EditTaskModal() {
    const {
        activeEditModalTask,
        modalTitle,
        modalParagraphs,
        changeModalTitle,
        onChangeModalCheckbox,
        onChangeModalParagraphDescription,
        onDeleteModalParagraph,
        onAddModalParagraph,
        onActiveModal,
        editTask,
        editCriticalStatus,
        criticalStatus
    } = useTask();
    return (
        <Modal
            active={activeEditModalTask}
            handleNegativeFunction={() => onActiveModal(null, "edit")}
        >
            <Modal.Header>
                <label htmlFor="recipient-name" className="col-form-label">
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
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="recipient-name" className="col-form-label">
                    Paragraphs:
                </label>
                <ol>
                    {modalParagraphs.map((item, index) => (
                        <li key={item.id} className="mb-1">
                            <div className="d-flex align-items-center">
                                <div className="input-group">
                                    <div className="input-group-text">
                                        <input
                                            className="form-check-input mt-0"
                                            type="checkbox"
                                            autoComplete="off"
                                            value=""
                                            aria-label="Checkbox for following text input"
                                            onChange={(e) =>
                                                onChangeModalCheckbox(e, index)
                                            }
                                            checked={item.completed}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className="form-control"
                                        aria-label="Text input with checkbox"
                                        value={item.description}
                                        onChange={(e) =>
                                            onChangeModalParagraphDescription(
                                                e,
                                                index
                                            )
                                        }
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() =>
                                        onDeleteModalParagraph(index)
                                    }
                                ></button>
                            </div>
                        </li>
                    ))}
                </ol>
                <button
                    className="btn btn-primary align-self-center"
                    onClick={() => onAddModalParagraph()}
                >
                    Add paragraph
                </button>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
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
                </div>
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
                        onChange={() => {editCriticalStatus()}}
                    />
                    <label className="btn btn-outline-danger" htmlFor="btncheck1">
                        Add critical status
                    </label>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => onActiveModal(null, "edit")}
                >
                    Close
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => editTask()}
                >
                    Edit task
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditTaskModal;
