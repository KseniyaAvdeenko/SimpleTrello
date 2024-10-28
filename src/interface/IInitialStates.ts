import {IUser} from "./IUser";
import {IBoard} from "./IBoard";
import {ITask, ITaskList} from "./ITasks";

export interface IInitialStateBase {
    error: string;
    message: string;
    isLoading: boolean;
}

export interface IAuthInitialState extends IInitialStateBase{
    isAuth: boolean;
    signedUp: boolean;
    currentUser: IUser | null;
    users: IUser[] | null
}

export interface IBoardInitialState extends IInitialStateBase{
    boards: IBoard[]| null;
    board: IBoard|null;
}

export interface ITaskListInitialState extends IInitialStateBase{
    taskLists: ITaskList[]| null;
    taskList: ITaskList|null;
}
export interface ITaskInitialState extends IInitialStateBase{
    tasks: ITask[]| null;
    task: ITask|null;
}

export interface IDragDropInitialState{
    currentTaskList: ITaskList|null;
    currentTask: ITask|null;
}