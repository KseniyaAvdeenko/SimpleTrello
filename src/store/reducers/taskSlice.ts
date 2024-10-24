import {ITaskInitialState} from "../../interface/IInitialStates";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITask} from "../../interface/ITasks";


const initialState: ITaskInitialState = {
    error: '',
    message: '',
    tasks: null,
    task: null,
    isLoading: false
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        fetchingTasks(state) {
            state.isLoading = true;
        },
        loadTasksSuccess(state, action: PayloadAction<ITask[]>) {
            state.isLoading = false;
            state.tasks = action.payload
        },
        loadTasksFail(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },
        deleteTaskSuccess(state) {
            state.task = null;
            state.message = 'Task is deleted successfully'
        },
        deleteTaskFail(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
        createTaskSuccess(state, action: PayloadAction<ITask>) {
            state.task = action.payload;
            state.message = 'Task is created successfully'
        },
        createTaskFail(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
    }
})

export default taskSlice.reducer