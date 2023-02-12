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

export const enum RETRIEVE_ROOMS_STATUS {
    REQUEST = "RETRIEVE_ROOMS_REQUEST",
    SUCCESS = "RETRIEVE_ROOMS_SUCCESS",
    ERROR = "RETRIEVE_ROOMS_ERROR"    
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

export interface IChatRoom {
    id: string;
    admin_id: number | null;
    name: string;
    description: string | null;
    picture: string | null;
    is_group_chat: boolean;
    created_at: Date;
    updated_at: Date;
}