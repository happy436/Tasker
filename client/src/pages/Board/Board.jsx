import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Filter from "components/ui/filter/Filter";
import Search from "components/ui/search/Search";
import { useTask } from "hook/useTask";
import {
    changeActiveProject,
    getProjectByID,
    loadProjects,
} from "store/projects";
import { loadTasksList } from "store/tasks";
import "./Board.css";
import Category from "./components/Category";
import TaskModal from "./components/modals/TaskModal";

function Board() {
    const dispatch = useDispatch();
    const { onActiveModal, activeModal } = useTask();
    const { projectID } = useParams();
    const project = useSelector(getProjectByID(projectID));
    useEffect(() => {
        dispatch(loadProjects());
        dispatch(loadTasksList(projectID));
        dispatch(changeActiveProject(projectID));
    }, []);

    const testListMarks = [
        { name: "Work" },
        { name: "Home" },
        { name: "Projects" },
        { name: "Hobby" },
    ];

    return (
        <>
            <div className="board-wrapper">
                <aside className="board-aside">
                    <section className="d-flex flex-column">
                        <label>Marks</label>
                        <ul>
                            {testListMarks.map((item) => (
                                <li key={item.name}>
                                    <label>
                                        <input type="checkbox" />
                                        {item.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </section>
                </aside>
                <main className="container board flex-container">
                    <h2>{project.name}</h2>
                    <div className="d-flex justify-content-between mb-3">
                        <div>
                            <button
                                type="button"
                                onClick={() => onActiveModal()}
                                className="btn btn-primary"
                            >
                                Add task
                            </button>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <Filter />
                            <Search />
                        </div>
                    </div>
                    <Category />
                    {activeModal && <TaskModal />}
                </main>
            </div>
        </>
    );
}

/* Main.propTypes = {} */

export default Board;
