import { combineReducers, configureStore } from "@reduxjs/toolkit"
import projectsReducer from "./projects"
import tasksReducer from "./tasks"

const rootReducer = combineReducers({
    tasks: tasksReducer,
    projects: projectsReducer,
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
