import React, {useEffect, useState} from 'react';
import {loadUsers, signedIn} from "./store/actions/authAction";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import styles from './App.module.sass';
import {useAppSelector} from "./hooks/useAppSelector";
import {loadBoards} from "./store/actions/boardAction";
import {loadTaskLists} from "./store/actions/taskListAction";
import {loadTasks} from "./store/actions/taskAction";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Board from "./pages/Board";
import Profile from "./pages/Profile";
import {IAuthCard} from "./interface/IAuthCard";
import authStyles from './assets/styles/Auth.module.sass'
import Header from "./components/Header";
import Authentication from "./components/Authentication/Authentication";

function App() {
    const {currentUser, isAuth} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const [authModal, setAuthModal] = useState<boolean>(false)
    const [authCardAndForms, setAuthCardAndForms] = useState<IAuthCard>({
        button: 'signUp',
        signUpCard: [authStyles.signUpCard, authStyles.blockIHidden].join(' '),
        signUpForm: [authStyles.signUpForm].join(' '),
        signInCard: [authStyles.signInCard].join(' '),
        signInForm: [authStyles.signInForm, authStyles.blockIHidden].join(' '),
    })

    useEffect(() => {
        dispatch(loadUsers())
        dispatch(loadBoards())
        dispatch(loadTaskLists())
        dispatch(loadTasks())
    }, [])

    useEffect(() => {
        if (currentUser) dispatch(signedIn())
    }, [currentUser])

    function showAuthForm(value: string) {
        if (value === 'signUp') {
            setAuthCardAndForms({
                ...authCardAndForms,
                button: value,
                signUpCard: [authStyles.signUpCard, authStyles.blockIHidden].join(' '),
                signUpForm: [authStyles.signUpForm].join(' '),
                signInCard: [authStyles.signInCard].join(' '),
                signInForm: [authStyles.signInForm, authStyles.blockIHidden].join(' '),
            })
        } else if (value === 'signIn') {
            setAuthCardAndForms({
                ...authCardAndForms,
                button: value,
                signUpCard: [authStyles.signUpCard].join(' '),
                signUpForm: [authStyles.signUpForm, authStyles.blockIHidden].join(' '),
                signInCard: [authStyles.signInCard, authStyles.blockIHidden].join(' '),
                signInForm: [authStyles.signInForm].join(' '),
            })
        }
    }

    function showAuthModal(value: string) {
        setAuthModal(true)
        showAuthForm(value)
    }

    return (
        <BrowserRouter>
            <div className={styles.app}>
                <Authentication
                    modal={authModal}
                    setModal={setAuthModal}
                    authCardAndForms={authCardAndForms}
                    showAuthForm={showAuthForm}
                />
                <Header showAuthModal={showAuthModal}/>
                <Routes>
                    {isAuth
                        ? <>
                            <Route path={'/'} element={<Main/>}/>
                            <Route path={'/board/:url'} element={<Board/>}/>
                            <Route path={'/profile'} element={<Profile/>}/>
                        </>
                        : <Route path={'/'} element={<Main/>}/>
                    }
                    <Route path="*" element={<Navigate to="/profile/"/>}/>
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
