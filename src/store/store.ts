import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice';
import boardReducer from './reducers/boardSlice';
import taskListReducer from './reducers/taskListSlice';
import taskReducer from './reducers/taskSlice';
import dragDropSliceReducer from './reducers/dragDropSlice';

export const rootReducer = combineReducers({
    authReducer,
    boardReducer,
    taskListReducer,
    taskReducer,
    dragDropSliceReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware({
        //         serializableCheck: false,
        //     }),
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];