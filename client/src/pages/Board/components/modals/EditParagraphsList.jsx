import React from "react";
import { CloseButton, Button } from "react-bootstrap";
import { useTask } from "../../../../hook/useTask";

function EditParagraphsList() {
    const {
        modalParagraphs,
        onChangeModalCheckbox,
        onChangeModalParagraphDescription,
        onDeleteModalParagraph,
        onAddModalParagraph,
    } = useTask();
    return (
        <>
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
                            <CloseButton
                                onClick={() => onDeleteModalParagraph(index)}
                            />
                        </div>
                    </li>
                ))}
            </ol>
            <Button
                className="mb-3"
                variant="primary"
                onClick={() => onAddModalParagraph()}
                style={{ width: "200px", alignSelf: "center" }}
            >
                Add paragraph
            </Button>
        </>
    );
}

export default EditParagraphsList;
