import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthInitialState} from "../../interface/IInitialStates";
import {IUser} from "../../interface/IUser";

const initialState:IAuthInitialState = {
    isAuth: false,
    signedUp:false,
    currentUser: localStorage.currentUser || null,
    error: '',
    message: '',
    users: null,
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUpSuccess(state){
            state.signedUp = true;
            state.message = 'You are signed up successfully';
        },
        signUpFail(state, action: PayloadAction<string>){
            state.signedUp = false;
            state.error = action.payload;
        },
        signInSuccess(state, action: PayloadAction<IUser>){
            state.isAuth = true;
            state.currentUser = action.payload;
            state.message = 'You are signed in successfully';
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        signInFail(state, action: PayloadAction<string>){
            state.isAuth = false;
            state.error = action.payload;
        },
        signedIn(state){
            state.isAuth = true;
        },
        signedOutSuccess(state){
            state.isAuth = false
            state.currentUser = null;
            localStorage.removeItem('currentUser');
        },
        fetchingUsers(state){
            state.isLoading = true
        },
        loadUsersSuccess(state, action: PayloadAction<IUser[]>){
            state.users = action.payload
            state.isLoading = false
        },
        loadUsersFail(state){
            state.error = 'Users are not loaded'
            state.isLoading = false
        },
    }
})

export default authSlice.reducer