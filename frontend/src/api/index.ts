// Requirements
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { StatusCodes } from "http-status-codes";

// Types
import { IRegisterFormData, ILoginFormData, IAddFriendFormData, ICreateGroupFormData, AxiosErrorExtended, ISendMessageFormData } from "../common/types";

// Constants
import { ACCESS_TOKEN_ERROR_MSG, REFRESH_TOKEN_ERROR_MSG } from "../common/contants";

// Services
import { setAccessToken, getAccessToken, clearAccessToken } from "../common/services";

/**
 * Initializing an axios API instance that points to the backend API endpoints.
 */
const API = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

/**
 * Adding axios request interceptor to append the access token to the headers
 */
API.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = getAccessToken();

    if (token !== null && token !== undefined) {
        config.headers = config.headers || {};
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
});

/**
 * Adding axios response interceptor in order to automatically redirect the browser to auth page 
 * or use the refresh token for retreval of new access token, 
 * incase of such error code being returned from the server.
 */
API.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosErrorExtended) => {
        const config = error.config ?? {};

        // Checking for FORBIDDEN status, it means that our provided refresh token was invalid,
        // we need to just redirect the user to log in
        if (error?.response?.status === StatusCodes.FORBIDDEN && error?.response?.data?.message === REFRESH_TOKEN_ERROR_MSG) {
            clearAccessToken();
            window.location.href = "/login";
            
            return Promise.reject(error);
        }

        // Checking for UNAUTHORIZED status
        if (
            error?.response?.status === StatusCodes.UNAUTHORIZED 
            && error?.response?.data?.message === ACCESS_TOKEN_ERROR_MSG 
            && !config?.retried
        ) {
            // Server has indicated to us, that we don't have a valid access token in header
            const { data } = await accessTokenCall();

            // Success, retreived the new access token, applying it
            if (data?.accessToken) {
                setAccessToken(data.accessToken);
            }

            // Indicating that this is a retry, to not have an infinite loop
            config.retried = true;

            return API(config);
        }

        return Promise.reject(error);
    }
);

const accessTokenCall = () => {
    return API.post("/auth/token");
}

export const registerCall = (formData: IRegisterFormData) => {
    return API.post("/auth/register", formData);
}

export const loginCall = (formData: ILoginFormData) => {
    return API.post("/auth/login", formData);
}

export const logoutCall = () => {
    return API.post("/auth/logout");
}

export const retrieveRoomsCall = () => {
    return API.get("/user/rooms");
}

export const retrieveContactsCall = () => {
    return API.get("/user/contacts");
}

export const addFriendCall = (formData: IAddFriendFormData) => {
    return API.post("/user/create_contact", formData);
}

export const createGroupCall = (formData: ICreateGroupFormData) => {
    return API.post("/room/create", formData);
}

export const retrieveRoomInfoCall = (roomId: string) => {
    return API.get(`/room/info/${roomId}`);
}

export const createMessageCall = (formData: ISendMessageFormData) => {
    return API.post("/message/create", formData);
}