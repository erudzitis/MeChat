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

export const enum RETRIEVE_CONTACTS_STATUS {
    REQUEST = "RETRIEVE_CONTACTS_REQUEST",
    SUCCESS = "RETRIEVE_CONTACTS_SUCCESS",
    ERROR = "RETRIEVE_CONTACTS_ERROR"
}

export const enum ADD_FRIEND_STATUS {
    REQUEST = "ADD_FRIEND_REQUEST",
    SUCCESS = "ADD_FRIEND_SUCCESS",
    ERROR = "ADD_FRIEND_ERROR"
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
    iat: number;
    exp: number;
}

export interface IAddFriendFormData {
    contactEmail: string;
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

export interface IAddFriendData {
    id: number,
    username: string,
    email: string,
    picture: string,
    description: string,
    room_id: number
}

export interface IContact {
    id: number;
    username: string;
    email: string;
    room_id: number;
    picture: string | null;
    description: string;
}

export interface IRetrieveRoomSuccess {
    type: RETRIEVE_ROOMS_STATUS.SUCCESS;
    payload: Array<IChatRoom>;
}

export interface IRetrieveRoomError {
    type: RETRIEVE_ROOMS_STATUS.ERROR;
    payload: string;
}

export interface IRetrieveRoomRequest {
    type: RETRIEVE_ROOMS_STATUS.REQUEST;
}

export interface IRetrieveContactsSuccess {
    type: RETRIEVE_CONTACTS_STATUS.SUCCESS;
    payload: Array<IContact>;
}

export interface IRetrieveContactsError {
    type: RETRIEVE_CONTACTS_STATUS.ERROR;
    payload: string;
}

export interface IRetrieveContactsRequest {
    type: RETRIEVE_CONTACTS_STATUS.REQUEST;
}

export interface IAddFriendSuccess {
    type: ADD_FRIEND_STATUS.SUCCESS;
    payload: IAddFriendData;
}

export interface IAddFriendError {
    type: ADD_FRIEND_STATUS.ERROR;
    payload: string;
}

export interface IAddFriendRequest {
    type: ADD_FRIEND_STATUS.REQUEST;
}

interface ICustomHooks {
    loading: boolean;
    error: string | null;
}

export interface IChatRoomHook extends ICustomHooks {
    data: Array<IChatRoom>;
}

export interface IContactsHook extends ICustomHooks {
    data: Array<IContact>;
}

export interface IModalHook {
    isOpen: boolean,
    open: () => void;
    close: () => void;
    toggle: () => void;
}