import {ITaskListInitialState} from "../../interface/IInitialStates";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITaskList} from "../../interface/ITasks";


const initialState: ITaskListInitialState = {
    error: '',
    message: '',
    taskLists: null,
    taskList: null,
    isLoading: false
}

export const taskListSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {
        fetchingTaskLists(state) {
            state.isLoading = true;
        },
        loadTaskListsSuccess(state, action: PayloadAction<ITaskList[]>) {
            state.isLoading = false;
            state.taskLists = action.payload
        },
        loadTaskListsFail(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },
        deleteTaskListSuccess(state) {
            state.taskList = null;
            state.message = 'Task list is deleted successfully'
        },
        deleteTaskListFail(state, action: PayloadAction<string>) {
            state.error = 'Task list deletion is failed'
        },
        createTaskListSuccess(state, action: PayloadAction<ITaskList>) {
            state.taskList = action.payload;
            state.message = 'Task list is created successfully'
        },
        createTaskListFail(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
    }
})

export default taskListSlice.reducer