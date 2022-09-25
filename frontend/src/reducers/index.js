// Requirements
import { combineReducers } from "redux";

// Reducers
import auth from "./auth";
import helper from "./helper";

export default combineReducers({
    auth,
    helper
});