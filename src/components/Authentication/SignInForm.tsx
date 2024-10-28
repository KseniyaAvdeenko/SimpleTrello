import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import styles from '../../assets/styles/Auth.module.sass';
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import ClosedEye from '../../assets/images/eyeClosed.svg';
import OpenedEye from '../../assets/images/eyeOpened.svg';
import {IAuthCard} from "../../interface/IAuthCard";
import {encodeToken} from "../../utils/passwordHashing";
import {signInUser} from "../../store/actions/authAction";
import {useNavigate} from "react-router-dom";

const SignInForm: FC<{ authCardAndForms: IAuthCard; setModal: Function}> = ({authCardAndForms, setModal}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [user, setUser] = useState<{ email: string, password: string }>({email: '', password: ''})
    const {users, error, isAuth} = useAppSelector(state => state.authReducer)
    const [passwordWatcher, setPasswordWatcher] = useState<{ type: string; image: string }>({
        type: 'password',
        image: ClosedEye
    })

    const onSingInSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(signInUser(users, {email: user.email, password: encodeToken(user.password)}))
        setModal(false)
        setUser({email: '', password: ''})
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setUser({...user, [e.target.name]: e.target.value})

    useEffect(() => {
        isAuth ? navigate('/profile') : navigate('/')
    }, [isAuth])

    return (
        <div className={authCardAndForms.signInForm}>
            <div className={styles.cards__heading}>Sign In</div>
            <div className={styles.errors}>{error && error}</div>
            <form onSubmit={e => onSingInSubmit(e)} className={styles.cards__form}>
                <div className={styles.cards__inputContainer}>
                    <input
                        type="email"
                        placeholder='Email'
                        required={true}
                        name="email"
                        id="signInEmail"
                        value={user.email}
                        onChange={e => onChange(e)}
                        className={styles.cards__input}
                    />
                </div>
                <div className={styles.cards__inputContainer}>
                    <input
                        type={passwordWatcher.type}
                        placeholder='Password'
                        required={true}
                        name="password"
                        id="signInPassword"
                        value={user.password}
                        onChange={e => onChange(e)}
                        className={styles.cards__input}
                    />
                    <div className={styles.passwordWatcher}>
                        <img onClick={() => passwordWatcher.type === 'text' ? setPasswordWatcher({
                            type: 'password',
                            image: ClosedEye
                        }) : setPasswordWatcher({type: 'text', image: OpenedEye})} src={passwordWatcher.image}
                             alt="eye"/>
                    </div>
                </div>
                <button className={styles.cards__button} style={{marginTop: '20px'}}>Sign in</button>
            </form>
        </div>
    );
};

export default SignInForm;
