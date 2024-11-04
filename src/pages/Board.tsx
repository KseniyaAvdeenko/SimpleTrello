import React, {FC, useEffect, useState} from 'react';
import styles from '../assets/styles/Board.module.sass';
import {useParams} from "react-router-dom";
import {useAppSelector} from "../hooks/useAppSelector";
import {IBoard} from "../interface/IBoard";
import {ITaskList, ITask} from "../interface/ITasks";
import TaskList from "../components/TaskList";
import TaskListForm from "../components/TaskListForm/TaskListForm";

const Board: FC = () => {
    const {url} = useParams();
    const {boards} = useAppSelector(state => state.boardReducer);
    const {taskLists} = useAppSelector(state => state.taskListReducer);
    const {tasks} = useAppSelector(state => state.taskReducer);
    //states
    const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null);
    const [boardTaskLists, setBoardTaskLists] = useState<ITaskList[] | null>(null)
    const [boardTasks, setBoardTasks] = useState<ITask[] | null>(null)
    const [taskListForm, setTaskListForm] = useState<boolean>(false)
    //methods
    const getCurrentBoard = (boards: IBoard[] | null, boardUrl: string | undefined) => {
        if (boards && boardUrl) {
            const board = boards.find(el => el.url === boardUrl)
            if (board) setCurrentBoard(board)
        }
    }

    const getBoardTaskLists = (taskLists: ITaskList[] | null, boardUrl: string | undefined) => {
        if (taskLists && boardUrl) setBoardTaskLists(taskLists.filter(el => el.boardUrl === boardUrl))
    }

    const getBoardTasks = (tasks: ITask[] | null, boardUrl: string | undefined) => {
        if (tasks && boardUrl) setBoardTasks(tasks.filter(el => el.boardUrl === boardUrl))
    }

    useEffect(() => {
        getCurrentBoard(boards, url);
        getBoardTaskLists(taskLists, url);
        getBoardTasks(tasks, url)
    }, [url, boards, taskLists, tasks])

    return currentBoard ? (
        <section className={styles.boardSection}
                 style={{backgroundColor: currentBoard.background, color: currentBoard.textColor}}>
            <div className={styles.taskList__items}>
                {boardTaskLists && boardTaskLists.map(taskList => (
                    <TaskList
                        key={taskList.taskListId}
                        currentBoard={currentBoard}
                        taskList={taskList}
                        boardTasks={boardTasks}
                    />
                ))
                }
                <div className={styles.taskListBtnContainer}>
                    <TaskListForm
                        taskListForm={taskListForm}
                        setTaskListForm={setTaskListForm}
                        board={currentBoard}
                    />
                    <button className={styles.taskList__btn} onClick={() => setTaskListForm(true)}
                    >+ add new task list
                    </button>
                </div>
            </div>
        </section>
    ) : (<section className={styles.boardSection}></section>)
};

export default Board;
