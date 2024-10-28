import {IDragDropInitialState} from "../../interface/IInitialStates";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITask, ITaskList} from "../../interface/ITasks";

const initialState: IDragDropInitialState = {
    currentTask: null,
    currentTaskList: null,
    // draggableTask: null,
    // draggableTaskList: null
}

export const dragDropSlice = createSlice({
    name: 'dragDrop',
    initialState,
    reducers: {
        getCurrentTaskList(state, action: PayloadAction<ITaskList>){
            state.currentTaskList = action.payload;
        },
        getCurrentTask(state, action: PayloadAction<ITask>){
            state.currentTask = action.payload;
        },
        deleteCurrentTaskList(state){
            state.currentTaskList = null;
        },
        deleteCurrentTask(state){
            state.currentTask = null;
        }
    }
})

export default dragDropSlice.reducer