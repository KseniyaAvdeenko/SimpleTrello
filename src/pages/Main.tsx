import React , {FC} from 'react';
import styles from '../assets/styles/Main.module.sass';
import MainImg from '../assets/images/mainImg.png';


const Main: FC = () => {
    return (
        <main className={styles.main}>
            <div className={styles.main__imageWrapper}>
                <img className={styles.main__img} src={MainImg} alt="main"/>
            </div>
            <h1 className={styles.main__heading}>Master the chaos</h1>
            <h4 className={styles.main__subheading}>get inspired, create, explore</h4>
        </main>
    );
};

export default Main;
