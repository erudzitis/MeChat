// Requirements
import { combineReducers } from "redux";

// Reducers
import auth from "./auth";
import helper from "./helper";
import chat from "./chat";

export default combineReducers({
    auth,
    chat,
    helper
});