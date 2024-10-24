import React from 'react';
import styles from '../assets/styles/Footer.module.sass'
import {Link} from "react-router-dom";
import Logo from '../assets/images/simpleTrelloLogo.svg'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link to="/" className={styles.footer__link}><img src={Logo} alt="logo"/></Link>
            <p className={styles.footer__text}>Made by AKA</p>
        </footer>
    );
};

export default Footer;
