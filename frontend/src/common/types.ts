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

export const enum CREATE_GROUP_STATUS {
    REQUEST = "CREATE_GROUP_REQUEST",
    SUCCESS = "CREATE_GROUP_SUCCESS",
    ERROR = "CREATE_GROUP_ERROR"
}

export const enum RETRIEVE_ROOM_DATA_STATUS {
    REQUEST = "RETRIEVE_ROOM_DATA_REQUEST",
    SUCCESS = "RETRIEVE_ROOM_DATA_SUCCESS",
    ERROR = "RETRIEVE_ROOM_DATA_ERROR"
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

export interface ICreateGroupFormData {
    name: string;
    description: string;
    groupUsers: Array<Number>;
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
    room_id: string;
    picture: string | null;
    description: string;
}

interface IChatRoomMessage {
    user_id: number;
    username: string;
    content: string;
    created_at: Date;
}

export interface IChatRoomParticipant {
    id: number;
    username: string;
    picture: string | null;
}

export interface IChatRoomInfo extends IChatRoom {
    messages: Array<IChatRoomMessage>;
    participants: Array<IChatRoomParticipant>;

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

export interface ICreateGroupSuccess {
    type: CREATE_GROUP_STATUS.SUCCESS;
    payload: IChatRoom;
}

export interface ICreateGroupError {
    type: CREATE_GROUP_STATUS.ERROR;
    payload: string;
}

export interface ICreateGroupRequest {
    type: CREATE_GROUP_STATUS.REQUEST;
}

export interface IRetreiveRoomInfoSuccess {
    type: RETRIEVE_ROOM_DATA_STATUS.SUCCESS;
    payload: IChatRoomInfo;
}

export interface IRetreiveRoomInfoError {
    type: RETRIEVE_ROOM_DATA_STATUS.ERROR;
    payload: string;
}

export interface IRetreiveRoomInfoRequest {
    type: RETRIEVE_ROOM_DATA_STATUS.REQUEST;
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