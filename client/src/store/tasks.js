import { createSlice } from "@reduxjs/toolkit";
import taskService from "services/tasks.service";
/* import notesService from "../services/notes.service" */
/* import localStorageService from "../services/localStorage.service"
import { toast } from "react-toastify" */

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
    },
    reducers: {
        tasksRequested: (state) => {
            state.isLoading = true;
        },
        tasksReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        tasksRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addTask: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        deleteTask: (state, action) => {
            state.entities.splice(
                state.entities.findIndex(
                    (item) => item.taskID === action.payload
                ),
                1
            );
            state.isLoading = false;
        },
        editTask: (state, action) => {
            const index = state.entities.findIndex(
                (c) => c.taskID === action.payload.taskID
            );
            state.entities[index] = action.payload;
            state.isLoading = false;
        },
        editCheckedStatusParagraphInTask: (state, action) => {
            const task = state.entities.find(
                (t) => t.taskID === action.payload.taskID
            );
            const paragraph = task.paragraphs.find(
                (p) => p.id === action.payload.paragraphID
            );
            paragraph.completed = !paragraph.completed;
        },
    },
});

const { reducer: tasksReducer, actions } = tasksSlice;
const {
    tasksRequested,
    editCheckedStatusParagraphInTask,
    deleteTask,
    tasksReceived,
    addTask,
    editTask /* ,
    tasksReceived,
    tasksRequestFailed,
    editTask,
    editCheckedStatusTask */,
} = actions;

/* export const loadNotesList = () => async dispatch => {
    const userId = localStorageService.getUserId()
    dispatch(notesRequested())
    try {
        const { content } = await notesService.getNotes(userId)
        dispatch(notesReceived(content))
    } catch (error) {
        dispatch(notesRequestFailed(error.message))
    }
}

/* export const createNote = data => async dispatch => { */
/* const note = {
        ...data,
        created_at: Date.now(),
        userId: localStorageService.getUserId()
    }; */
/* dispatch(notesRequested())
    try {
        const { content } = await notesService.createNote(data)
        dispatch(addNote(content))
    } catch (error) {
        dispatch(notesRequestFailed(error.message))
    }
}

export const toggleCheckedNoteStatus =
    payload => async (dispatch, getState) => {
        dispatch(notesRequested())
        try {
            dispatch(editCheckedStatusNote(payload))
            const checked = getState().notes.entities.find(
                item => item._id === payload
            )
            const { content } = await notesService.update(checked)
            if (typeof content !== "object") {
                return null
            }
        } catch (error) {
            dispatch(notesRequestFailed(error.message))
        }
    }

export const editData = payload => async dispatch => {
    dispatch(notesRequested())
    try {
        const { content } = await notesService.update(payload)
        if (typeof content === "object") {
            toast.success("Note edit successful", { autoClose: 2000 })
        }
        dispatch(editNote(payload))
    } catch (error) {
        dispatch(notesRequestFailed(error.message))
    }
}

export const removeNote = id => async dispatch => {
    dispatch(notesRequested())
    try {
        const { content } = await notesService.removeNote(id)
        if (!content) {
            toast.success("Note deleted successfully", { autoClose: 2000 })
            dispatch(deleteNote({ id }))
        }
    } catch (error) {
        dispatch(notesRequestFailed(error.message))
    }
} */

export const loadTasksList = (projectID) => async (dispatch) => {
    dispatch(tasksRequested());
    try {
        const data = await taskService.getTasks(projectID);
        dispatch(tasksReceived(data.taskList));
    } catch (error) {
        console.log(error);
    }
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;
export const getTaskById = (id) => (state) => {
    if (state.notes.entities) {
        return state.notes.entities.find((n) => n._id === id);
    }
};

export const createTask = (payload, projectID) => async (dispatch) => {
    dispatch(tasksRequested());
    try {
        const data = await taskService.createTask(payload, projectID);
        dispatch(addTask(data));
    } catch (error) {
        console.log(error);
    }
};

export const changeTask = (data, projectID, taskID) => async (dispatch) => {
    dispatch(tasksRequested());
    try {
        await taskService.update(data, projectID, taskID);
        dispatch(editTask(data));
    } catch (error) {
        console.log(error);
    }
};

export const removeTask = (projectID, taskID) => async (dispatch) => {
    dispatch(tasksRequested());
    try {
        await taskService.delete(projectID, taskID)
        dispatch(deleteTask(taskID));
    } catch (error) {
        console.log(error);
    }
};

export default tasksReducer;
