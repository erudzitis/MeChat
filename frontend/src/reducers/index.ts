// Requirements
import { AnyAction, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from "redux-thunk";

// Reducers
import { helperReducer } from "./helper";
import { authReducer } from "./auth";
import { chatReducer } from "./chat";

const rootReducer = combineReducers({
    helper: helperReducer,
    auth: authReducer,
    chat: chatReducer
});

export const store = configureStore({ 
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type ReducerState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReducerState, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;