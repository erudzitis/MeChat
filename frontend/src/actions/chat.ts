import { Dispatch } from "redux";

// API endpoint calls
import { retrieveRoomsCall, addFriendCall, retrieveContactsCall, createGroupCall } from "../api";

// Types
import {
    IRetrieveRoomSuccess,
    IRetrieveRoomError,
    IRetrieveRoomRequest,
    IAddFriendSuccess,
    IAddFriendError,
    IAddFriendRequest,
    IChatRoom,
    IAddFriendData,
    RETRIEVE_ROOMS_STATUS,
    ADD_FRIEND_STATUS,
    RETRIEVE_CONTACTS_STATUS,
    IAddFriendFormData,
    IRetrieveContactsSuccess,
    IRetrieveContactsError,
    IRetrieveContactsRequest,
    IContact,
    ICreateGroupFormData,
    ICreateGroupSuccess,
    ICreateGroupError,
    ICreateGroupRequest,
    CREATE_GROUP_STATUS
} from "../common/types";

type RetrieveRoomsDispatch = IRetrieveRoomSuccess | IRetrieveRoomError | IRetrieveRoomRequest;

/**
 * Invokes the API call to retrieve list of rooms and updates the state of the request.
 */
export const retrieveRoomsAction = () => async (dispatch: Dispatch<RetrieveRoomsDispatch>) => {
    dispatch({ type: RETRIEVE_ROOMS_STATUS.REQUEST });

    retrieveRoomsCall()
        .then(({ data }: { data: { data: Array<IChatRoom>, success: boolean } }) => {
            dispatch({ type: RETRIEVE_ROOMS_STATUS.SUCCESS, payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: RETRIEVE_ROOMS_STATUS.ERROR, payload: error?.response?.data?.message });
        })
};

type AddFriendDispatch = IAddFriendSuccess | IAddFriendError | IAddFriendRequest;

/**
 * Invokes the API call to send a friend request and updates the state of the request.
 * @param formData IAddFriendFormData
 * @param onSuccess Method that gets called after successful request
 */
export const addFriendAction = (formData: IAddFriendFormData, onSuccess: () => void) => async (dispatch: Dispatch<AddFriendDispatch>) => {
    dispatch({ type: ADD_FRIEND_STATUS.REQUEST });

    addFriendCall(formData)
        .then(({ data }: { data: { data: IAddFriendData } }) => {
            dispatch({ type: ADD_FRIEND_STATUS.SUCCESS, payload: data.data });
            onSuccess();
        })
        .catch((error) => {
            dispatch({ type: ADD_FRIEND_STATUS.ERROR, payload: error?.response?.data?.message });
        });
};

type RetrieveContactsDispatch = IRetrieveContactsSuccess | IRetrieveContactsError | IRetrieveContactsRequest;

/**
 * Invokes the API call to retrieve list of rooms and updates the state of the request.
 */
export const retrieveContactsAction = () => async (dispatch: Dispatch<RetrieveContactsDispatch>) => {
    dispatch({ type: RETRIEVE_CONTACTS_STATUS.REQUEST });

    retrieveContactsCall()
        .then(({ data }: { data: { data: Array<IContact>, success: boolean } }) => {
            dispatch({ type: RETRIEVE_CONTACTS_STATUS.SUCCESS, payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: RETRIEVE_CONTACTS_STATUS.ERROR, payload: error?.response?.data?.message });
        })
};

type CreateGroupDispatch = ICreateGroupSuccess | ICreateGroupError | ICreateGroupRequest;

/**
 * Invokes the API call to send a friend request and updates the state of the request.
 * @param formData IAddFriendFormData
 * @param onSuccess Method that gets called after successful request
 */
export const createGroupAction = (formData: ICreateGroupFormData, onSuccess: () => void) => async (dispatch: Dispatch<CreateGroupDispatch>) => {
    dispatch({ type: CREATE_GROUP_STATUS.REQUEST });

    createGroupCall(formData)
        .then(({ data }: { data: { data: IChatRoom } }) => {
            dispatch({ type: CREATE_GROUP_STATUS.SUCCESS, payload: data.data });
            onSuccess();
        })
        .catch((error) => {
            dispatch({ type: CREATE_GROUP_STATUS.ERROR, payload: error?.response?.data?.message });
        });
};