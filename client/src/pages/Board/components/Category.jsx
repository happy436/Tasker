import React, { useState } from "react";
import Modal from "../../../components/ui/common/Modal";
import { useTask } from "../../../hook/useTask";
import EditTaskModal from "./EditTaskModal";
import Task from "./Task";

function Category() {
    const {
        filteredTasksByCategories,
        handleChangeActiveCategory,
        activeCategoryIndex,
        onDeleteTask,
        onActiveModal
    } = useTask();
    const [activeConfirmModal, setConfirmModal] = useState(false);
    const [confirmTaskID, setConfirmTaskID] = useState()
    const handleShowConfirmModal = (data) => {
        setConfirmModal(!activeConfirmModal);
        setConfirmTaskID(data)
    };
    const handleConfirmRemove = () => {
        onDeleteTask(confirmTaskID)
        setConfirmModal(!activeConfirmModal);
        setConfirmTaskID()
    }
    return (
        <>
            <div>
                <ul className="nav nav-tabs">
                    {filteredTasksByCategories.map((data, index) => (
                        <li
                            key={index}
                            onClick={() => handleChangeActiveCategory(index)}
                            className="nav-item"
                        >
                            <span
                                className={`nav-link ${
                                    activeCategoryIndex === index
                                        ? "active"
                                        : null
                                }`}
                            >
                                <h3
                                    className={`btn ${data.color} position-relative`}
                                >
                                    {data.category}
                                    {data.taskList.length !== 0 ? (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {data.taskList.length}
                                            <span className="visually-hidden">
                                                task count
                                            </span>
                                        </span>
                                    ) : null}
                                </h3>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            {filteredTasksByCategories.length !== 0 ? (
                <section className="gap-3 tasks-list border border-top-0 border-light-subtle p-4">
                    <ul className="list-group d-flex flex-wrap gap-3 align-content-stretch justify-content-center flex-row">
                        {filteredTasksByCategories[activeCategoryIndex].taskList
                            .length !== 0 ? (
                            filteredTasksByCategories[
                                activeCategoryIndex
                            ].taskList.map((task) => (
                                <li key={task.taskID}>
                                    <Task
                                        handleActiveEditModal={onActiveModal}
                                        data={task}
                                        activeRemoveModal={
                                            handleShowConfirmModal
                                        }
                                    />
                                </li>
                            ))
                        ) : (
                            <h3>Empty</h3>
                        )}
                    </ul>
                </section>
            ) : null}
            <Modal
                active={activeConfirmModal}
                title="Confirm remove?"
                positiveTitleButton="Remove"
                handleNegativeFunction={handleShowConfirmModal}
                handlePositiveFunction={handleConfirmRemove}
            >
                <Modal.Body>Do you really want to remove this task?</Modal.Body>
            </Modal>
            <EditTaskModal/>
        </>
    );
}

export default Category;
