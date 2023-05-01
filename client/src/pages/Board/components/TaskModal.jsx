import React from "react";
import { useTask } from "../../../hook/useTask";
import Modal from "../../../components/ui/common/Modal";

function TaskModal() {
    const {
        modalTitle,
        changeModalTitle,
        modalParagraphs,
        onAddModalParagraph,
        onChangeModalParagraphDescription,
        onChangeModalCheckbox,
        onDeleteModalParagraph,
        onCreateTask,
        activeModal,
        onActiveModal
    } = useTask();

    return (
        <Modal active={activeModal} handleNegativeFunction={onActiveModal}>
            <Modal.Header>
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add task
                </h1>
            </Modal.Header>
            <Modal.Body>
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
                                            value=""
                                            aria-label="Checkbox for following text input"
                                            onChange={(e) =>
                                                onChangeModalCheckbox(e, index)
                                            }
                                            checked={item.checked}
                                        />
                                    </div>
                                    <input
                                        type="text"
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
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => onActiveModal()}
                >
                    Close
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onCreateTask()}
                >
                    Add task
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskModal;
