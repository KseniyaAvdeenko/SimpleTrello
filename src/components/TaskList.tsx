import React, {FC, useState, DragEvent, useEffect} from 'react';
import styles from '../assets/styles/Board.module.sass';
import {ITask, ITaskList} from "../interface/ITasks";
import CopyIcon from "../icons/CopyIcon";
import {IBoard} from "../interface/IBoard";
import DeleteIcon from "../icons/DeleteIcon";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {createTask, deleteTask, loadTasks} from "../store/actions/taskAction";
import TaskForm from "./TaskForm/TaskForm";


interface ITaskListProps {
    currentBoard: IBoard
    taskList: ITaskList;
    boardTasks: ITask[] | null
}

const TaskList: FC<ITaskListProps> = ({taskList, currentBoard, boardTasks}) => {
    const dispatch = useAppDispatch();
    const [isTaskFormOpen, setIsTaskFormOpen] = useState<boolean>(false)

    const [tasks, setTasks] = useState<ITask[]>([])

    const [currentTaskList, setCurrentTaskList] = useState<ITaskList | null>(null);
    const [currentTask, setCurrentTask] = useState<ITask | null>(null);

    useEffect(() => {
        if (boardTasks) setTasks(boardTasks.filter(el => el.taskListId === taskList.taskListId))
    }, [boardTasks])

    const sortTasks = (a: ITask, b: ITask) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.currentTarget.hasAttribute('data-order')) {
            e.currentTarget.style.boxShadow = '0 2px 5px 0 #454545'
        }
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        const parentNode = e.currentTarget.parentNode as HTMLDivElement;
        if (parentNode && parentNode.childNodes) parentNode.childNodes.forEach(task => {
            const taskItem = task as HTMLDivElement;
            if (taskItem && taskItem.style) taskItem.style.boxShadow = '0 0 10px 0 rgba(69, 69, 69, 0.25)'
        })
    }

    const dragStartHandler = (e: DragEvent<HTMLDivElement>, taskList: ITaskList, task: ITask) => {
        setCurrentTaskList(taskList)
        setCurrentTask(task)
    }

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        const parentNode = e.currentTarget.parentNode as HTMLDivElement;
        if (parentNode && parentNode.childNodes) parentNode.childNodes.forEach(task => {
            const taskItem = task as HTMLDivElement;
            if (taskItem && taskItem.style) taskItem.style.boxShadow = '0 0 10px 0 rgba(69, 69, 69, 0.25)'
        })
    }

    const dropHandler = (e: DragEvent<HTMLDivElement>, taskList: ITaskList, task: ITask) => {
        e.preventDefault()
        const parentNode = e.currentTarget.parentNode as HTMLDivElement;
        let targetIndex = Array.prototype.indexOf.call(parentNode.children, e.target)
        let draggableTask;
        if(currentTaskList && currentTask) {
            draggableTask = structuredClone(currentTask);
            deleteTaskHandler(currentTaskList.taskListId, currentTask);
        }
        setCurrentTask(null);
        draggableTask.taskListId = taskList.taskListId;
        draggableTask.order = targetIndex;
        dispatch(createTask(draggableTask))
        // setTasks(reIndexTasks(tasks))
    }

    const listDropHandler = (e: DragEvent<HTMLDivElement>, taskList: ITaskList) => {
        e.preventDefault()
        // if (!tasks.filter(t => t.taskListId === taskList.taskListId).length) {
        //     let draggableTask = Object.assign(currentTask, {})
        //     deleteTask(currentTaskList.taskListId, currentTask)
        //     setCurrentTask(null)
        //     draggableTask.taskListId = taskList.taskListId
        //     addItem(db, 'trello', 'Tasks', 'tasks', draggableTask).then(res => res)
        //     setTasks(reIndexTasks(taskList.taskListId, tasks, copyTasks(taskList.taskListId, tasks)))
        // }
    }


    function reIndexTasks(currentTasks: ITask[]) {
        let savedTasks: ITask[] = structuredClone(currentTasks);
        currentTasks.map(task => dispatch(deleteTask(task)))
        savedTasks = savedTasks.sort(sortTasks).map((task, i) => {
            task.order = i + 1;
            return task
        })
        savedTasks.forEach(task => dispatch(createTask(task)))
        //return savedTasks
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
                        <p>id: {task.taskId} {task.title} order: {task.order}</p>
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
                    {/*<CopyIcon fill={copyTaskListIconFill}*/}
                    {/*          onMouseOver={() => setCopyTaskListIconFill('#2E8B57')}*/}
                    {/*          onClick={() => props.copyTaskList(props.btl.taskListName)}*/}
                    {/*          classname={[boardStyles.taskList__icon, commonStyle.mr_10].join(' ')}*/}
                    {/*          onMouseOut={() => setCopyTaskListIconFill(props.boardSectionStyles.color)}/>*/}
                    {/*<DeleteIcon fill={deleteTaskListIconFill}*/}
                    {/*            classname={boardStyles.taskList__icon}*/}
                    {/*            onClick={() => props.deleteTaskList(props.btl)}*/}
                    {/*            onMouseOver={() => setDeleteTaskListIconFill('#2E8B57')}*/}
                    {/*            onMouseOut={() => setDeleteTaskListIconFill(props.boardSectionStyles.color)}/>*/}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
