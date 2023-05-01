import { combineReducers, configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./tasks"

const rootReducer = combineReducers({
    tasks: tasksReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
