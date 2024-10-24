import {AppDispatch} from "../store";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebaseClient";

export const loadTasks = () => async (dispatch: AppDispatch) => {
    // try {
    //     dispatch(boardSlice.actions.fetchingBoards())
    //     const querySnapshot = await getDocs(collection(db, "trello"));
    //     const fb = querySnapshot.docs[2].data()
    //     console.log(fb)
    //     //return dispatch(boardSlice.actions.loadBoardsSuccess())
    // } catch {
    //     //return dispatch(boardSlice.actions.loadBoardsFail('Problems in database'))
    // }
}
