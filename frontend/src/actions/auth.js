// local imports
import { registerAPICall, loginAPICall } from "../api";

const registerAction = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "REGISTER_REQUEST" });

    registerAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "REGISTER_SUCCESS", payload: data.token });
            navigate("/");
        })
        .catch((error) => {
            dispatch({ type: "REGISTER_ERROR", payload: error?.response?.data?.message });
        })
}

const loginAction = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });

    loginAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
            navigate("/");
        })
        .catch((error) => {
            dispatch({ type: "LOGIN_ERROR", payload: error?.response?.data?.message });
        })
}

const logoutAction = () => async (dispatch) => {
    dispatch({ type: "LOGOUT_SUCCESS" });
}

const userDataAction = (data) => async (dispatch) => {
    dispatch({ type: "USER_DATA", payload: data });
}

export {
    registerAction,
    loginAction,
    logoutAction,
    userDataAction
}
