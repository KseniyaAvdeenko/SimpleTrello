import React, {FC} from 'react';
import styles from '../../assets/styles/Auth.module.sass';
import {IAuthCard} from "../../interface/IAuthCard";

const SignInCard: FC<{authCardAndForms: IAuthCard, showAuthForm: Function}> = ({authCardAndForms, showAuthForm}) => {
    return (
        <div className={authCardAndForms.signInCard}>
            <div className={styles.cards__heading}>Welcome back to simpleTrello ??</div>
            <button className={styles.cards__button} onClick={()=>showAuthForm('signIn')}>Sign in</button>
        </div>
    );
};

export default SignInCard;
