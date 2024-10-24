import {AppDispatch} from "../store";
import {arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebaseClient";
import {boardSlice} from "../reducers/boardSlice";
import {IBoard} from "../../interface/IBoard";

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

export const createBoard = (newBoard: IBoard) => async (dispatch: AppDispatch) => {
    try {
        await updateDoc(doc(db, 'trello', 'Boards'), {
            'boards': arrayUnion(newBoard)
        });
        dispatch(loadBoards())
        return dispatch(boardSlice.actions.createBoardSuccess(newBoard))
    } catch {
        return dispatch(boardSlice.actions.createBoardFail('Board creation is failed'))
    }
}

export const deleteBoard = (board: IBoard) => async (dispatch: AppDispatch) => {
    try {
        await updateDoc(doc(db, 'trello', 'Boards'), {
            'boards': arrayRemove(board)
        });
        dispatch(loadBoards())
        return dispatch(boardSlice.actions.deleteBoardSuccess())
    } catch {
        return dispatch(boardSlice.actions.deleteBoardFail('Board deletion is failed'))
    }
}