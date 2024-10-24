import React, {useEffect, useState} from 'react';
import {loadUsers} from "./store/actions/authAction";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {BrowserRouter} from "react-router-dom";
import styles from './App.module.sass';
import {useAppSelector} from "./hooks/useAppSelector";
import {encodeToken} from "./utils/passwordHashing";
import {IUser} from "./interface/IUser";
import {loadBoards} from "./store/actions/boardAction";

function App() {
    const {users} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const [signUpUser, setSignUpUser] = useState<IUser>({id: 0, login: '', email: '', password: ''})
    const [signInUser, setSignInUser] = useState<{email: string, password: string}>({email: '', password: ''})

    useEffect(() => {
        dispatch(loadUsers())
        dispatch(loadBoards())
    }, [])
    return (
        <BrowserRouter>
                <div className={styles.app}>
                    {/*<Authentication*/}
                    {/*    setAuthModal={setAuthModal}*/}
                    {/*    authModal={authModal}*/}
                    {/*    authCardAndForms={authCardAndForms}*/}
                    {/*    allUsers={allUsers}*/}
                    {/*    signInUser={signInUser}*/}
                    {/*    onSingUpChange={onSingUpChange}*/}
                    {/*    onSingUpSubmit={onSingUpSubmit}*/}
                    {/*    onSingInChange={onSingInChange}*/}
                    {/*    showAuthForm={showAuthForm}*/}
                    {/*    signUpErrors={signUpErrors}*/}
                    {/*/>*/}
                    {/*<Header showAuthModal={showAuthModal}/>*/}
                    {/*<AppRouter/>*/}
                    {/*<Footer/>*/}
                </div>
            </BrowserRouter>
    );
}

export default App;
