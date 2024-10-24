import React, {FC} from 'react';
import {IAuthCard} from "../../interface/IAuthCard";
import styles from '../../assets/styles/Auth.module.sass';

const SignUpCard: FC<{ authCardAndForms: IAuthCard, showAuthForm: Function }> = ({authCardAndForms, showAuthForm}) => {
    return (
       <div className={authCardAndForms.signUpCard}>
            <div className={styles.cards__heading}>Haven’t got any account yet??</div>
            <button className={styles.cards__button} onClick={()=>showAuthForm('signUp')}>Sign up</button>
        </div>
    );
};

export default SignUpCard;
