import React, {FC} from 'react';
import styles from '../../assets/styles/Auth.module.sass';
import {IAuthCard} from "../../interface/IAuthCard";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

interface IAuthenticationProps {
    modal: boolean;
    setModal: Function;
    authCardAndForms: IAuthCard;
    showAuthForm: Function
}

const Authentication: FC<IAuthenticationProps> = ({modal, setModal, authCardAndForms, showAuthForm}) => {
    return (
        <div
            onClick={() => setModal(false)}
            className={modal
                ? [styles.auth__modal, styles.authModalLightMode].join(' ')
                : [styles.auth__modal, styles.authModalLightMode, styles.blockIHidden].join(' ')
            }>
            <div onClick={(e) => e.stopPropagation()}
                 className={[styles.auth__container, styles.authContainerLightMode].join(' ')}>
                <SignUpForm showAuthForm={showAuthForm} authCardAndForms={authCardAndForms}/>
                <SignInCard showAuthForm={showAuthForm} authCardAndForms={authCardAndForms}/>
                <SignUpCard showAuthForm={showAuthForm} authCardAndForms={authCardAndForms}/>
                <SignInForm authCardAndForms={authCardAndForms} setModal={setModal}/>
            </div>
        </div>
    );
};

export default Authentication;
