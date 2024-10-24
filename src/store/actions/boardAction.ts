import {AppDispatch} from "../store";

import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebaseClient";
import {boardSlice} from "../reducers/boardSlice";

export const loadBoards = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(boardSlice.actions.fetchingBoards())
        const querySnapshot = await getDocs(collection(db, "trello"));
        const {boards} = querySnapshot.docs[0].data()
        return dispatch(boardSlice.actions.loadBoardsSuccess(boards))
    } catch {
        return dispatch(boardSlice.actions.loadBoardsFail('Problems in database'))
    }
}

export const createBoard = () => async (dispatch: AppDispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "trello"));
        const {boards} = querySnapshot.docs[0].data()
        return dispatch(boardSlice.actions.loadBoardsSuccess(boards))
    } catch {
        return dispatch(boardSlice.actions.loadBoardsFail('Problems in database'))
    }
}