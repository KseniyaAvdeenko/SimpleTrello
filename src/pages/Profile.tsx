import React, {FC, MouseEvent, useEffect, useState} from 'react';
import styles from '../assets/styles/Profile.module.sass';
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks/useAppSelector";
import {IBoard} from "../interface/IBoard";
import {IUser} from "../interface/IUser";
import NewBoardForm from "../components/BoardForm/NewBoardForm";
import DeleteIcon from "../icons/DeleteIcon";

const Profile: FC = () => {
    const {currentUser} = useAppSelector(state => state.authReducer);
    const {boards} = useAppSelector(state => state.boardReducer);
    const [userBoards, setUserBoards] = useState<IBoard[]>([])
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const getUserBoards = (boards: IBoard[] | null, user: IUser | null) => {
        if (boards && user) setUserBoards(boards.filter(el => el.userId === user.id))
    }

    useEffect(() => {
        getUserBoards(boards, currentUser)
    }, [boards, currentUser])

    const hoverIn = (e: MouseEvent<HTMLAnchorElement>) => {
        if (e.currentTarget.style) {
            let bgColor = e.currentTarget.style.backgroundColor;
            e.currentTarget.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.6) 100%) ${bgColor}`
            e.currentTarget.style.color = 'white'
        }
        const deleteIcon = e.currentTarget.lastChild as HTMLElement
        if (deleteIcon && deleteIcon.style) {
            deleteIcon.style.display = 'block'
        }
    }

    const hoverOut = (e: MouseEvent<HTMLAnchorElement>) => {
        if (e.currentTarget.style) {
            e.currentTarget.style.color = '#1e1e1e'
            e.currentTarget.style.background = e.currentTarget.style.backgroundColor;
        }
        const deleteIcon = e.currentTarget.lastChild as HTMLElement
        if (deleteIcon && deleteIcon.style) {
            deleteIcon.style.display = 'none'
        }
    }



    return currentUser ? (
        <div className={styles.profile}>
            <div className={styles.profileContainer}>
                <div className={styles.newBoardBtnContainer}>
                    <button className={styles.newBoardButton} onClick={() => setIsOpenModal(true)}>
                        <span style={{marginRight: '10px'}}>+</span> <span> new board</span>
                    </button>
                    <NewBoardForm
                        isOpen={isOpenModal}
                        setIsOpen={setIsOpenModal}
                        currentUserId={currentUser.id}
                    />
                </div>
                {userBoards && userBoards.map(board => (
                    <Link key={board.url} to={"/board/" + board.url} className={styles.userBoardLink}
                          onMouseOver={e => hoverIn(e)} onMouseOut={e => hoverOut(e)}
                          style={{backgroundColor: board.background}}
                    >
                        {board.name}
                        <DeleteIcon classname={styles.userBoardLink__deleteBtn} board={board}/>
                    </Link>
                ))
                }
            </div>
        </div>
    ) : (<div className={styles.profile}></div>)
};

export default Profile;
