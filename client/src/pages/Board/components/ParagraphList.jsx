import React from "react";
import PropTypes from "prop-types";
import { useTask } from "hook/useTask";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";

function ParagraphsList({ data }) {
    const { editCompleteStatus } = useTask();
    const { projectID } = useParams();
    return (
        <ListGroup>
            {data.paragraphs.map((item) => (
                <ListGroup.Item key={item.id}>
                    <label className="pointer">
                        <input
                            className="form-check-input me-1 pointer"
                            type="checkbox"
                            value=""
                            style={{ cursor: "pointer" }}
                            checked={item.completed}
                            onChange={() =>
                                editCompleteStatus(
                                    projectID,
                                    data,
                                    item.id
                                )
                            }
                        />
                        {item.completed ? (
                            <s>{item.description}</s>
                        ) : (
                            item.description
                        )}
                    </label>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

ParagraphsList.propTypes = {
    data: PropTypes.object,
};

export default ParagraphsList;
