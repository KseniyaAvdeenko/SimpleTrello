import {AppDispatch} from "../store";
import {arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebaseClient";
import {ITask} from "../../interface/ITasks";
import {taskSlice} from "../reducers/taskSlice";

export const loadTasks = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.fetchingTasks())
        const querySnapshot = await getDocs(collection(db, "trello"));
        const {tasks} = querySnapshot.docs[2].data()
        return dispatch(taskSlice.actions.loadTasksSuccess(tasks))
    } catch {
        return dispatch(taskSlice.actions.loadTasksFail('Problems in database'))
    }
}


export const createTask = (newTask: ITask) => async (dispatch: AppDispatch) => {
    try {
        await updateDoc(doc(db, 'trello', 'Tasks'), {
            'tasks': arrayUnion(newTask)
        });
        dispatch(taskSlice.actions.createTaskSuccess(newTask))
        dispatch(loadTasks())
    } catch {
        dispatch(taskSlice.actions.createTaskFail('Task creation is failed'))
    }
}

export const deleteTask = (task: ITask) => async (dispatch: AppDispatch) => {
    try {
        await updateDoc(doc(db, 'trello', 'Tasks'), {
            'tasks': arrayRemove(task)
        });
        dispatch(taskSlice.actions.deleteTaskSuccess())
        dispatch(loadTasks())
    } catch {
        dispatch(taskSlice.actions.deleteTaskFail('Task deletion is failed'))
    }
}