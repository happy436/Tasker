import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UilBookAlt, UilPadlock } from "@iconscout/react-unicons";
import { useProject } from "hook/useProject";

function ProjectModal() {
	const {
		handleCreateProject,
		onActiveModal,
		activeModal,
		onChangeModalTitle,
		projectTitle,
		handleChangeProjectVisibility,
		/* 
		projectVisibility,
		, */
	} = useProject();

	const radioComponent = (arr) => {
		return arr.map((item) => (
			<Form.Check key={item.label} type="radio">
				<Form.Check.Input
					type="radio"
					name="group1"
					id={item.label}
					onChange={(e) => {
						handleChangeProjectVisibility(e.target.id);
					}}
				/>
				<Form.Check.Label className="d-flex gap-1">
					{item.image}
					{item.label}
				</Form.Check.Label>
			</Form.Check>
		));
	};

	const array = [
		{ image: <UilBookAlt />, label: "Public" },
		{ image: <UilPadlock />, label: "Privat" },
	];

	return (
		<Modal
			show={activeModal}
			onHide={onActiveModal}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<h4>Create project</h4>
			</Modal.Header>
			<Modal.Body className="d-flex flex-column gap-3">
				<Form.Group>
					<Form.Label>
						<b>Project Title</b>
					</Form.Label>
					<Form.Control
						placeholder="Title"
						aria-describedby="basic-addon1"
						autoFocus={true}
						onChange={(e) => onChangeModalTitle(e.target.value)}
						value={projectTitle}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="projectStatus">
					<Form.Label>
						<b>Project visibility</b>
					</Form.Label>
					{radioComponent(array)}
					{/* <Form.Check type="radio">
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
					</Form.Check> */}
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onActiveModal}>
					Close
				</Button>
				<Button onClick={() => handleCreateProject()}>
					Add project
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ProjectModal;
