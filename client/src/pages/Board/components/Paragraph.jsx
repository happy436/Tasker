import React from "react";
import PropTypes from "prop-types";
import { useTask } from "../../../hook/useTask";

function Paragraph({ data }) {
	const { editCompleteStatus } = useTask();
	return (
		<label className="list-group-item" style={{cursor:"pointer"}}>
			<input
				className="form-check-input me-1"
				type="checkbox"
				value=""
				style={{cursor:"pointer"}}
				checked={data.completed}
				onChange={() => editCompleteStatus(data.taskID, data.id)}
			/>
			{data.completed ? <s>{data.description}</s> : data.description}
		</label>
	);
}

Paragraph.propTypes = {
	data: PropTypes.object,
};

export default Paragraph;
