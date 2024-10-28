import React, {ChangeEvent, FC, useState} from 'react';
import styles from '../../assets/styles/Auth.module.sass';
import {useAppSelector} from "../../hooks/useAppSelector";
import ClosedEye from '../../assets/images/eyeClosed.svg';
import OpenedEye from '../../assets/images/eyeOpened.svg';
import {IAuthCard} from "../../interface/IAuthCard";
import {IUser} from "../../interface/IUser";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {encodeToken} from "../../utils/passwordHashing";
import {signUpUser} from "../../store/actions/authAction";

const SignUpForm: FC<{ authCardAndForms: IAuthCard;showAuthForm: Function }> = ({authCardAndForms, showAuthForm}) => {
    const {users, error} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch()
    const [passwordVisibility, setPasswordVisibility] = useState<{ type: string; image: string }>({
        type: 'password',
        image: ClosedEye
    })
    const [newUser, setNewUser] = useState<IUser>({id: 0, login: '', email: '', password: ''})

    function togglePasswordVisibility() {
        passwordVisibility.type === 'text'
            ? setPasswordVisibility({...passwordVisibility, type: 'password', image: ClosedEye})
            : setPasswordVisibility({...passwordVisibility, type: 'text', image: OpenedEye})
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setNewUser({...newUser, [e.target.name]: e.target.value})


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(signUpUser(users, {
            id: Date.parse(new Date().toISOString()),
            login: newUser.login,
            email: newUser.email,
            password: encodeToken(newUser.password)
        }))
        showAuthForm('signIn')
        setNewUser({email: '', login: '', password: '', id: 0})
    }

    return (
        <div className={authCardAndForms.signUpForm}>
            <div className={styles.cards__heading}>Sign Up</div>
             <div className={styles.errors}>{error && error}</div>
            <form onSubmit={e => onSubmit(e)} className={styles.cards__form}>
                <div className={styles.cards__inputContainer}>
                    <input
                        type="text"
                        placeholder='Login'
                        required={true}
                        name="login"
                        id="signUpLogin"
                        value={newUser.login}
                        onChange={e => onChange(e)}
                        className={styles.cards__input}
                    />
                </div>
                <div className={styles.cards__inputContainer}>
                    <input
                        type="email"
                        placeholder='Email'
                        required={true}
                        name="email"
                        id="signUpEmail"
                        value={newUser.email}
                        onChange={e => onChange(e)}
                        className={styles.cards__input}
                    />
                </div>
                <div className={styles.cards__inputContainer}>
                    <input
                        type={passwordVisibility.type}
                        placeholder='Password'
                        required={true}
                        name="password"
                        value={newUser.password}
                        id="signUpPassword"
                        onChange={e => onChange(e)}
                        className={styles.cards__input}
                    />
                    <div className={styles.passwordWatcher}>
                        <img onClick={() => togglePasswordVisibility()} src={passwordVisibility.image} alt="eye"/>
                    </div>
                </div>
                <button className={styles.cards__button}>Sign up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
