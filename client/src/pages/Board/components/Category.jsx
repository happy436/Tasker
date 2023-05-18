import React from "react";
import { useTask } from "hook/useTask";
import EditTaskModal from "./modals/EditTaskModal";
import Task from "./Task";
import ModalQuestion from "components/ui/common/ModalQuestion";
import { useParams } from "react-router-dom";

function Category() {
    const {
        filteredTasksByCategories,
        handleChangeActiveCategory,
        activeCategoryIndex,
        onActiveModal,
        activeEditModalTask,
        activeConfirmRemoveTaskModal,
        handleShowConfirmRemoveTaskModal,
        handleConfirmRemoveTask,
    } = useTask();
    const { projectID } = useParams();
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
                <section className="gap-3 board-taskList tasks-list border border-top-0 border-light-subtle p-4">
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
            {activeConfirmRemoveTaskModal && (
                <ModalQuestion
                    active={activeConfirmRemoveTaskModal}
                    hide={handleShowConfirmRemoveTaskModal}
                    submit={() => handleConfirmRemoveTask(projectID)}
                    title={"Confirm remove?"}
                    body={"Do you really want to remove this task?"}
                    titleButton={"Remove"}
                />
            )}
            {activeEditModalTask && <EditTaskModal />}
        </>
    );
}

export default Category;
