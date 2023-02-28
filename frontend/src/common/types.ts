import { integer } from "aws-sdk/clients/cloudfront";
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

export const enum CLEAR_ROOM_DATA_STATUS {
    REQUEST = "CLEAR_ROOM_DATA_STATUS_REQUEST"
}

export const enum CREATE_MESSAGE_STATUS {
    REQUEST = "CREATE_MESSAGE_REQUEST",
    SUCCESS = "CREATE_MESSAGE_SUCCESS",
    ERROR = "CREATE_MESSAGE_ERROR"
}

export const enum READ_ROOM_STATUS {
    REQUEST = "READ_ROOM_REQUEST",
    SUCCESS = "READ_ROOM_SUCCESS",
    ERROR = "READ_ROOM_ERROR"
}

export const enum INCOMING_ROOM_MESSAGE_STATUS {
    SUCCESS = "INCOMING_ROOM_MESSAGE_STATUS"
}

export const enum INCOMING_USER_STATUS {
    ONLINE = "INCOMING_USER_STATUS_ONLINE",
    OFFLINE = "INCOMING_USER_STATUS_OFFLINE",
}

export const enum INCOMING_TYPING_STATUS {
    START = "INCOMING_TYPING_STATUS_START",
    STOP = "INCOMING_TYPING_STATUS_STOP"
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

export interface ISendMessageFormData {
    roomId: string;
    content: string;
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
    latest_msg_username: string;
    latest_msg_content: string;
    latest_msg_date: Date;
    read_at: Date;
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

export interface IOnline {
    [id: number]: boolean
}

export interface IOnlineWS {
    online: IOnline;
}

export interface IContact {
    id: number;
    username: string;
    email: string;
    room_id: string;
    picture: string | null;
    description: string;
    latest_msg_username?: string;
    latest_msg_content?: string;
    latest_msg_date?: Date;
    read_at?: Date;
}

export interface IChatRoomMessage {
    user_id: number;
    username: string;
    content: string;
    created_at: Date;
}

export interface IChatRoomMessageIncomingWS extends IChatRoomMessage {
    room_id: string;
}

export interface IChatRoomMessageData {
    user_id: number;
    room_id: string;
    content: string;
}

export interface IChatRoomReadData {
    room_id: string;
    read_at: Date;
}

export interface IChatRoomParticipant {
    id: number;
    username: string;
    picture: string | null;
}

export interface ITyping {
    [id: number]: boolean;
}

export interface IChatRoomInfo extends IChatRoom {
    messages: Array<IChatRoomMessage>;
    participants: Array<IChatRoomParticipant>;
    typing: ITyping
}

export interface ITypingWS {
    user_id: number;
    room_id: string;
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

export interface IClearRoomInfoRequest {
    type: CLEAR_ROOM_DATA_STATUS.REQUEST;
}

export interface ICreateMessageSuccess {
    type: CREATE_MESSAGE_STATUS.SUCCESS;
    payload: IChatRoomMessageData;
}

export interface ICreateMessageError {
    type: CREATE_MESSAGE_STATUS.ERROR;
    payload: string;
}

export interface ICreateMessageRequest {
    type: CREATE_MESSAGE_STATUS.REQUEST;
}

export interface IReadRoomSuccess {
    type: READ_ROOM_STATUS.SUCCESS;
    payload: IChatRoomReadData;
}

export interface IReadRoomError {
    type: READ_ROOM_STATUS.ERROR;
    payload: string;
}

export interface IReadRoomRequest {
    type: READ_ROOM_STATUS.REQUEST;
}

export interface IIncomingMessageSuccess {
    type: INCOMING_ROOM_MESSAGE_STATUS.SUCCESS;
    payload: IChatRoomMessageIncomingWS;
}

export interface IOnlineUsersSuccess {
    type: INCOMING_USER_STATUS.ONLINE;
    payload: IOnline;
}

export interface ITypingStatusSuccess {
    type: INCOMING_TYPING_STATUS.START | INCOMING_TYPING_STATUS.STOP;
    payload: ITypingWS
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

export interface IUserHook {
    id: number;
    username: string;
    email: string;
}