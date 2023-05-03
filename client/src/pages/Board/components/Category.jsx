import React from "react";
import { useTask } from "../../../hook/useTask";
import EditTaskModal from "./modals/EditTaskModal";
import Task from "./Task";
import ConfirmRemoveTaskModal from "./modals/ConfirmRemoveTaskModal";

function Category() {
    const {
        filteredTasksByCategories,
        handleChangeActiveCategory,
        activeCategoryIndex,
        onActiveModal,
        handleShowConfirmRemoveTaskModal,
        activeEditModalTask
    } = useTask();

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
                                            handleShowConfirmRemoveTaskModal
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
            <ConfirmRemoveTaskModal/>
            {activeEditModalTask && <EditTaskModal />}
        </>
    );
}

export default Category;
