import React from "react";
import PropTypes from "prop-types";
import CloseButton from "react-bootstrap/CloseButton";
import Alert from "react-bootstrap/Alert";
import ParagraphsList from "./ParagraphList";

function Task({ data, activeRemoveModal, handleActiveEditModal }) {
    return (
        <Alert variant={data.color}>
            <div className="d-flex justify-content-between">
                <h4
                    role="button"
                    onClick={() => handleActiveEditModal(data, "edit")}
                >
                    {data.title}
                </h4>
                <CloseButton onClick={() => activeRemoveModal(data.taskID)} />
            </div>
            <ParagraphsList data={data}/>
        </Alert>
    );
}

Task.propTypes = {
    data: PropTypes.object,
    activeRemoveModal: PropTypes.func,
    handleActiveEditModal: PropTypes.func,
};

export default Task;
