import React, {FC, useState, DragEvent, useEffect} from 'react';
import styles from '../assets/styles/Board.module.sass';
import {ITask, ITaskList} from "../interface/ITasks";
import CopyIcon from "../icons/CopyIcon";
import {IBoard} from "../interface/IBoard";
import DeleteIcon from "../icons/DeleteIcon";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {createTask, deleteTask} from "../store/actions/taskAction";
import TaskForm from "./TaskForm/TaskForm";
import {dragLeaveTask} from "../utils/dragLeaveTask";
import {useAppSelector} from "../hooks/useAppSelector";
import {
    createCurrentTask,
    createCurrentTaskList,
    deleteCurrTask,
    deleteCurrTaskList
} from "../store/actions/dragdropAction";
import {createTaskList, deleteTaskList} from "../store/actions/taskListAction";


interface ITaskListProps {
    currentBoard: IBoard
    taskList: ITaskList;
    boardTasks: ITask[] | null
}

const TaskList: FC<ITaskListProps> = ({taskList, currentBoard, boardTasks}) => {
    const dispatch = useAppDispatch();
    const {currentTask, currentTaskList} = useAppSelector(state => state.dragDropSliceReducer);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState<boolean>(false)

    const [tasks, setTasks] = useState<ITask[]>([])

    const [copyTaskListIconFill, setCopyTaskListIconFill] = useState(currentBoard.textColor);
    const [deleteTaskListIconFill, setDeleteTaskListIconFill] = useState(currentBoard.textColor);

    useEffect(() => {
        if (boardTasks) setTasks(boardTasks.filter(el => el.taskListId === taskList.taskListId))
    }, [boardTasks])

    useEffect(()=>{
        tasks.map((task, i)=>{
            if(task.order !== i+1) reIndexTasks(tasks)
        })
    }, [tasks])

    const sortTasks = (a: ITask, b: ITask) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.currentTarget.hasAttribute('data-order')) e.currentTarget.style.backgroundColor = '#ededed'
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => dragLeaveTask(e.currentTarget)

    const dragStartHandler = (e: DragEvent<HTMLDivElement>, taskList: ITaskList, task: ITask) => {
        dispatch(createCurrentTaskList(taskList));
        dispatch(createCurrentTask(task))
    }

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => dragLeaveTask(e.currentTarget)

    const deleteCurrentListAndTask = () => {
        dispatch(deleteCurrTaskList())
        dispatch(deleteCurrTask())
    }

    const dropHandler = (e: DragEvent<HTMLDivElement>, taskList: ITaskList, task: ITask) => {
        e.preventDefault()
        if (currentTaskList && currentTask) {
            const currentTarget = structuredClone(task);
            const targetIndex = currentTarget.order;
            const draggableTask = structuredClone(currentTask);
            dispatch(deleteTask(currentTask))
            dispatch(deleteTask(task))
            currentTarget.order = draggableTask.order
            draggableTask.taskListId = taskList.taskListId;
            draggableTask.order = targetIndex;
            dispatch(createTask(currentTarget))
            dispatch(createTask(draggableTask))
            deleteCurrentListAndTask()
        }
    }

    const listDropHandler = (e: DragEvent<HTMLDivElement>, taskList: ITaskList) => {
        e.preventDefault()
        if (currentTaskList && currentTask) {
            if (boardTasks && !boardTasks.filter(el => el.taskListId === taskList.taskListId).length) {
                let draggableTask = structuredClone(currentTask);
                draggableTask.taskListId = taskList.taskListId
                draggableTask.order = 1
                dispatch(createTask(draggableTask))
                dispatch(deleteTask(currentTask));
                deleteCurrentListAndTask();
            }
        }
    }

    function reIndexTasks(currentTasks: ITask[]) {
        let savedTasks: ITask[] = structuredClone(currentTasks);
        currentTasks.map(task => dispatch(deleteTask(task)))
        savedTasks = savedTasks.sort(sortTasks).map((task, i) => {
            task.order = i + 1;
            return task
        })
        savedTasks.forEach(task => dispatch(createTask(task)))
    }

    const deleteTaskHandler = (taskListId: string, task: ITask) => {
        dispatch(deleteTask(task))
        reIndexTasks(tasks.filter(el => el.taskId !== task.taskId))
    }

    const copyTask = (taskListId: string, task: ITask) => {
        dispatch(createTask({
            taskId: 'task' + Date.parse(new Date().toISOString()),
            title: task.title,
            taskListId: task.taskListId,
            boardUrl: task.boardUrl,
            order: tasks.length + 1
        }))
    }

    const copyTaskList = (taskList: ITaskList) => {
        const newTaskList: ITaskList = {
            taskListId: 'taskList' + Date.parse(new Date().toISOString()),
            taskListName: taskList.taskListName,
            boardUrl: taskList.boardUrl
        }
        dispatch(createTaskList(newTaskList))
        if (boardTasks && boardTasks.filter(el => el.taskListId === taskList.taskListId).length)
            boardTasks.filter(el => el.taskListId === taskList.taskListId).map(task => {
                const newTask: ITask = {
                    taskId: 'task' + Date.parse(new Date().toISOString()),
                    taskListId: newTaskList.taskListId,
                    title: task.title,
                    order: task.order,
                    boardUrl: currentBoard.url
                }
                dispatch(createTask(newTask))
            })
    }

    const deleteTaskListHandler = (taskList: ITaskList) => {
        if (boardTasks && boardTasks.filter(el => el.taskListId === taskList.taskListId).length)
            boardTasks.filter(el => el.taskListId === taskList.taskListId).map(task => dispatch(deleteTask(task)))
        dispatch(deleteTaskList(taskList))
    }

    return (
        <div className={styles.taskList__item}
             onDragOver={e => dragOverHandler(e)}
             onDrop={(e) => listDropHandler(e, taskList)}
             data-list={taskList.taskListId}
        >
            <div className={styles.taskList__heading}>{taskList.taskListName}</div>
            <div className={styles.task__items}>
                {tasks && tasks.filter(task => task.taskListId === taskList.taskListId).sort(sortTasks).map(task => (
                    <div className={styles.task__item}
                         key={task.taskId}
                         data-order={task.order}
                         draggable={true}
                         onDragOver={(e) => dragOverHandler(e)}
                         onDragLeave={(e) => dragLeaveHandler(e)}
                         onDragStart={(e) => dragStartHandler(e, taskList, task)}
                         onDragEnd={(e) => dragEndHandler(e)}
                         onDrop={(e) => dropHandler(e, taskList, task)}
                    >
                        <p>{task.title}</p>
                        <div className={styles.taskList__settings}>
                            <div onClick={() => copyTask(taskList.taskListId, task)}>
                                <CopyIcon classname={styles.taskList__copyIcon} fill={currentBoard.textColor}/>
                            </div>
                            <div onClick={() => deleteTaskHandler(taskList.taskListId, task)}>
                                <DeleteIcon classname={styles.taskList__icon} fill={currentBoard.textColor}/>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>

            <div className={styles.btnContainer}>
                <TaskForm
                    isOpen={isTaskFormOpen}
                    setIsOpen={setIsTaskFormOpen}
                    taskList={taskList}
                    taskArrayLength={tasks.length}
                />
                <button className={styles.taskList__button} style={{display: isTaskFormOpen ? 'none' : 'block'}}
                        onClick={() => setIsTaskFormOpen(true)}>
                    + add task
                </button>
                <div className={[styles.taskList__settings].join(' ')}>
                    <div style={{marginRight: '1rem'}}
                         onMouseOut={() => setCopyTaskListIconFill(currentBoard.textColor)}
                         onClick={() => copyTaskList(taskList)}
                         onMouseOver={() => setCopyTaskListIconFill(currentBoard.background)}>
                        <CopyIcon fill={copyTaskListIconFill} classname={styles.taskList__icon}/>
                    </div>
                    <div onClick={() => deleteTaskListHandler(taskList)}
                         onMouseOver={() => setDeleteTaskListIconFill(currentBoard.background)}
                         onMouseOut={() => setDeleteTaskListIconFill(currentBoard.textColor)}
                    >
                        <DeleteIcon fill={deleteTaskListIconFill} classname={styles.taskList__icon}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
