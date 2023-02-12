import { AxiosError } from "axios";

/* Enums */
export const enum REGISTER_REQUEST_STATUS {
    REQUEST = "REGISTER_REQUEST",
    SUCCESS = "REGISTER_SUCCESS",
    ERROR = "REGISTER_ERROR"
}

export const enum LOGIN_REQUEST_STATUS {
    REQUEST = "LOGIN_REQUEST",
    SUCCESS = "LOGIN_SUCCESS",
    ERROR = "LOGIN_ERROR"
}

/* Interfaces */
export interface ILoginFormData {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface IRegisterFormData extends ILoginFormData {
    email: string;
}

export interface IAuthUserData {
    id: number;
    username: string;
    email: string;
}

export type AxiosErrorExtended = AxiosError & {
    config: {
        retried: boolean;
    },
    response: {
        data: {
            message?: string;
        }
    }
}

export interface IAccessToken {
    accessToken: string
}