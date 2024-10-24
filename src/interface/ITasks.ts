export interface ITaskList {
    taskListId: string;
    boardUrl: string;
    taskListName: string;
}

export interface ITask {
    taskId: string;
    taskListId: string;
    boardUrl: string;
    title: string;
    order: number
}