import {IBoardInitialState} from "../../interface/IInitialStates";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBoard} from "../../interface/IBoard";


const initialState: IBoardInitialState = {
    error: '',
    message: '',
    boards: null,
    board: null,
    isLoading: false
}

export const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        fetchingBoards(state) {
            state.isLoading = true;
        },
        loadBoardsSuccess(state, action: PayloadAction<IBoard[]>) {
            state.isLoading = false;
            state.boards = action.payload
        },
        loadBoardsFail(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },
        deleteBoardSuccess(state, action: PayloadAction<IBoard[]>) {
            state.board = null;
            state.message = 'Board is deleted successfully'
        },
        deleteBoardFail(state, action: PayloadAction<string>) {
            state.error = 'Board deletion is failed'
        },
        createBoardSuccess(state, action: PayloadAction<IBoard>) {
            state.board = action.payload;
            state.message = 'Board is created successfully'
        },
        createBoardFail(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
    }
})

export default boardSlice.reducer