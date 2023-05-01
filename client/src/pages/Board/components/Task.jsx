import React from "react";
import PropTypes from "prop-types";
import Paragraph from "./Paragraph";

function Task({ data, activeRemoveModal, handleActiveEditModal }) {
    return (
        <div className="flex-shrink-1 rounded-3 card-body alert-primary task">
            <div className="d-flex justify-content-between">
                <h4 role="button" onClick={() => handleActiveEditModal(data, "edit")}>
                    {data.title}
                </h4>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                        activeRemoveModal(data.taskID);
                    }}
                ></button>
            </div>

            <div className="list-group">
                {data.paragraphs.map((item) => (
                    <Paragraph
                        key={item.id}
                        data={{ ...item, taskID: data.taskID }}
                    />
                ))}
            </div>
        </div>
    );
}

Task.propTypes = {
    data: PropTypes.object,
    activeRemoveModal: PropTypes.func,
    handleActiveEditModal: PropTypes.func,
};

export default Task;
