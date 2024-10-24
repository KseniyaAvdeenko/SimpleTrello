import {AppDispatch} from "../store";
import {arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebaseClient";
import {taskListSlice} from "../reducers/taskListSlice";
import {ITaskList} from "../../interface/ITasks";

export const loadTaskLists = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskListSlice.actions.fetchingTaskLists())
        const querySnapshot = await getDocs(collection(db, "trello"));
        const {taskLists} = querySnapshot.docs[1].data()
        return dispatch(taskListSlice.actions.loadTaskListsSuccess(taskLists))
    } catch {
        return dispatch(taskListSlice.actions.loadTaskListsFail('Problems in database'))
    }
}



export const createTaskList = (newTaskList: ITaskList) => async (dispatch: AppDispatch) => {
    try {
        await updateDoc(doc(db, 'trello', 'TaskList'), {
            'taskLists': arrayUnion(newTaskList)
        });
        dispatch(loadTaskLists())
        return dispatch(taskListSlice.actions.createTaskListSuccess(newTaskList))
    } catch {
        return dispatch(taskListSlice.actions.createTaskListFail('Task list creation is failed'))
    }
}

export const deleteTaskList = (taskList: ITaskList) => async (dispatch: AppDispatch) => {
    try {
        await updateDoc(doc(db, 'trello', 'TaskList'), {
            'taskLists': arrayRemove(taskList)
        });
        dispatch(loadTaskLists())
        return dispatch(taskListSlice.actions.deleteTaskListSuccess())
    } catch {
        return dispatch(taskListSlice.actions.deleteTaskListFail('Task list deletion is failed'))
    }
}