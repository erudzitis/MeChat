// local imports
import { registerAPICall, loginAPICall } from "../api";

const registerAction = (formData) => async (dispatch) => {
    dispatch({ type: "REGISTER_REQUEST" });

    registerAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "REGISTER_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: "REGISTER_ERROR", payload: error?.response?.data?.message });
        })
}

const loginAPICall = (formData) => async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });

    registerAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: "LOGIN_ERROR", payload: error?.response?.data?.message });
        })
}

export default {
    registerAction,
    loginAPICall
}
