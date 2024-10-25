import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import styles from '../../assets/styles/Profile.module.sass';
import {IBoard} from "../../interface/IBoard";
import {borderBgColors, borderTextColors} from "../../utils/boardOptions";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {createId} from "../../utils/createId";
import {createBoard} from "../../store/actions/boardAction";
import CloseIcon from "../../icons/CloseIcon";
import OptionChoosing from "./OptionChoosing";

interface INewBoardFormProps {
    isOpen: boolean
    setIsOpen: Function
    currentUserId: number
}

const NewBoardForm: FC<INewBoardFormProps> = ({isOpen, setIsOpen, currentUserId}) => {
    const dispatch = useAppDispatch();

    const [newBoard, setNewBoard] = useState<IBoard>({
        name: '',
        textColor: "",
        background: '',
        userId: currentUserId,
        url: ''
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.name === 'name'
            ? setNewBoard({...newBoard, name: e.target.value, url: e.target.value + createId()})
            : setNewBoard({...newBoard, [e.target.name]: e.target.value})
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createBoard(newBoard))
        e.currentTarget.reset()
        setIsOpen(false)
    }

    return (
        <div className={isOpen
            ? [styles.newBoardFormContainer, styles.newBoardFormContainer_open].join(' ')
            : styles.newBoardFormContainer}>
            <div className={styles.closeBtnContainer} onClick={() => setIsOpen(false)}>
                <CloseIcon classname={styles.closeBtnContainer__btn}/>
            </div>

            <form onSubmit={e => onSubmit(e)} className={styles.newBoardForm}
                  onClick={(e) => e.stopPropagation()}>
                <div className={styles.inputContainer}>
                    <input
                        required={true}
                        type="text"
                        name="name"
                        id="boardName"
                        placeholder="Enter board name"
                        value={newBoard.name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className={styles.inputContainer__items}>
                    <p>Text color</p>
                    <OptionChoosing
                        optionsArray={borderTextColors}
                        value={newBoard.textColor}
                        onChange={onChange}
                        inputName={'textColor'}
                    />
                </div>
                <div className={styles.inputContainer__items}>
                    <p>Board background</p>
                    <OptionChoosing
                        optionsArray={borderBgColors}
                        value={newBoard.background}
                        onChange={onChange}
                        inputName={'background'}
                    />
                </div>
                <button className={styles.newBoardForm__button}>Create new board</button>
            </form>
        </div>
    );
};

export default NewBoardForm;
