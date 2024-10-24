import {AppDispatch} from "../store";
import {db} from '../../firebase/firebaseClient';
import {arrayUnion, collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {authSlice} from "../reducers/authSlice";
import {IUser} from "../../interface/IUser";

export const loadUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.fetchingUsers())
        const querySnapshot = await getDocs(collection(db, "trello"));
        const {users} = querySnapshot.docs[3].data()
        return dispatch(authSlice.actions.loadUsersSuccess(users))
    } catch {
        return dispatch(authSlice.actions.loadUsersFail())
    }
}

export const signUp = (users: IUser[]|null, newUser: IUser) => async (dispatch: AppDispatch) => {
    if (users) {
        try {
            if (users.length) {
                if (users.filter(el => el.email === newUser.email).length) {
                    dispatch(authSlice.actions.signUpFail('User with this email is already existed'))
                } else {
                    await updateDoc(doc(db, 'trello', 'Users'), {
                        'users': arrayUnion(newUser)
                    });
                    dispatch(authSlice.actions.signUpSuccess())
                }
            } else {
                await updateDoc(doc(db, 'trello', 'Users'), {
                    'users': arrayUnion(newUser)
                });
            }
        } catch {
            return dispatch(authSlice.actions.signUpFail('Registration is failed'))
        }
    } else {
        return dispatch(authSlice.actions.signUpFail('Problems in database'))
    }
}

export const signIn = (users: IUser[]|null, user: IUser) => async (dispatch: AppDispatch) => {
    if (users) {
        try {
            if (users.length) {
                if (users.filter(el => el.email === user.email && el.password === user.password).length) {
                    dispatch(authSlice.actions.signInSuccess(user))
                } else {
                    dispatch(authSlice.actions.signInFail('User with this email is not existed yet'))
                }
            } else {
                dispatch(authSlice.actions.signInFail('User with this email is not existed yet'))
            }
        } catch {
            return dispatch(authSlice.actions.signUpFail('Authorization is failed'))
        }
    } else {
        return dispatch(authSlice.actions.signUpFail('Problems in database'))
    }
}

export const signOut = () => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.signedOutSuccess())
}
