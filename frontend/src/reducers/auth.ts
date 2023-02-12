import jwtDecode from "jwt-decode";

// Types
import { REGISTER_REQUEST_STATUS, LOGIN_REQUEST_STATUS, IAuthUserData } from "../common/types";

// Services
import { setAccessToken } from "../common/services";

/**
 * Reducer state
*/
interface IAuthState {
    authUser: null | IAuthUserData;
}

const initialState = { authUser: null } as IAuthState;

/**
 * Reducer action
*/
interface IAuthReducerAction {
    type: REGISTER_REQUEST_STATUS.SUCCESS | LOGIN_REQUEST_STATUS.SUCCESS;
    payload: string;
}

export const authReducer = (state = initialState, action: IAuthReducerAction) => {
    switch (action.type) {
        case REGISTER_REQUEST_STATUS.SUCCESS:
        case LOGIN_REQUEST_STATUS.SUCCESS:
            // Setting the short-lived access token
            setAccessToken(action.payload);  
            
            // Decoding the token and updating the auth user state
            const decodedToken = jwtDecode(action.payload);

            // Updating the state
            return { ...state, authUser: decodedToken };
        default:
            return state;
    }
} 