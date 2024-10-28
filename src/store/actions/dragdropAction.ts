import {ITask, ITaskList} from "../../interface/ITasks";
import {AppDispatch} from "../store";
import {dragDropSlice} from "../reducers/dragDropSlice";

export const createCurrentTaskList = (taskList: ITaskList) => async (dispatch: AppDispatch) => {
    dispatch(dragDropSlice.actions.getCurrentTaskList(taskList))
}

export const createCurrentTask = (task: ITask) => async (dispatch: AppDispatch) => {
    dispatch(dragDropSlice.actions.getCurrentTask(task))
}

export const deleteCurrTaskList = () => async (dispatch: AppDispatch) => {
    dispatch(dragDropSlice.actions.deleteCurrentTaskList())
}

export const deleteCurrTask = () => async (dispatch: AppDispatch) => {
    dispatch(dragDropSlice.actions.deleteCurrentTask())
}