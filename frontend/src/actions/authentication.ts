import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";

// API endoint calls
import { registerCall, loginCall } from "../api";

// Types
import { IRegisterFormData, ILoginFormData } from "../common/types";
import { REGISTER_REQUEST_STATUS, LOGIN_REQUEST_STATUS } from "../common/types";

interface IAuthDispatch {
    type: REGISTER_REQUEST_STATUS | LOGIN_REQUEST_STATUS;
    payload?: string
}

/* Cookie based authentication is used, therefore on successful response,
   short-lived access token is expected in return, refresh token set in cookie */

/**
 * Invokes the register API call and updates the state of the request. Request being successful, redirects to homepage.
 * @param formData IRegisterFormData
 * @returns 
 */
export const registerAction = (formData: IRegisterFormData, navigate: NavigateFunction) => async (dispatch: Dispatch<IAuthDispatch>) => { 
    dispatch({ type: REGISTER_REQUEST_STATUS.REQUEST });

    registerCall(formData)
        .then(({ data }) => {
            dispatch({ type: REGISTER_REQUEST_STATUS.SUCCESS, payload: data.accessToken });
            navigate("/");
        })
        .catch((error) => {
            dispatch({ type: REGISTER_REQUEST_STATUS.ERROR, payload: error?.response?.data?.message });
        })
}

/**
 * Invokes the login API call and updates the state of the request. Request being successful, redirects to homepage.
 * @param formData ILoginFormData
 * @returns 
 */
export const loginAction = (formData: ILoginFormData, navigate: NavigateFunction) => async (dispatch: Dispatch<IAuthDispatch>) => {
    dispatch({ type: LOGIN_REQUEST_STATUS.REQUEST });

    loginCall(formData)
        .then(({ data }) => {
            dispatch({ type: LOGIN_REQUEST_STATUS.SUCCESS, payload: data.accessToken });
            navigate("/");
        })
        .catch((error) => {
            dispatch({ type: LOGIN_REQUEST_STATUS.ERROR, payload: error?.response?.data?.message });
        })
}