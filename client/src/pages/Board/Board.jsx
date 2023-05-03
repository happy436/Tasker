import React from "react";
import Filter from "../../components/ui/filter/Filter";
import Search from "../../components/ui/search/Search";
import { useTask } from "../../hook/useTask";
import "./Board.css";
import Category from "./components/Category";
import TaskModal from "./components/modals/TaskModal";

function Board() {
    const { onActiveModal, filteredTasksByCategories } = useTask();

    return (
        <main className="container">
            <h2>Social Network</h2>
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
            <TaskModal />
        </main>
    );
}

/* Main.propTypes = {} */

export default Board;
