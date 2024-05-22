import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import {  signupReducer } from "./Authentication/reducer";
import { loginReducer } from "./Authentication/reducer";
import { taskReducer } from "./Tasks/reducer";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
    signupReducer,
    loginReducer,
    tasks:taskReducer,
});

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));

