import { Dispatch } from "redux";

// API endpoint calls
import { retrieveRoomsCall, addFriendCall, retrieveContactsCall, createGroupCall, retrieveRoomInfoCall, createMessageCall, readRoomCall, removeRoomCall, removeContactCall } from "../api";

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
    CREATE_GROUP_STATUS,
    IRetreiveRoomInfoSuccess,
    IRetreiveRoomInfoError,
    IRetreiveRoomInfoRequest,
    RETRIEVE_ROOM_DATA_STATUS,
    IChatRoomInfo,
    CLEAR_ROOM_DATA_STATUS,
    IClearRoomInfoRequest,
    ISendMessageFormData,
    CREATE_MESSAGE_STATUS,
    IChatRoomMessageData,
    ICreateMessageError,
    ICreateMessageRequest,
    ICreateMessageSuccess,
    IReadRoomSuccess,
    IReadRoomError,
    IReadRoomRequest,
    READ_ROOM_STATUS,
    IChatRoomReadData,
    IIncomingMessageSuccess,
    IChatRoomMessageIncomingWS,
    INCOMING_ROOM_MESSAGE_STATUS,
    INCOMING_USER_STATUS,
    IOnlineUsersSuccess,
    IOnlineWS,
    ITypingWS,
    INCOMING_TYPING_STATUS,
    ITypingStatusSuccess,
    IRemoveRoomFormData,
    IRemoveRoomSuccess,
    IRemoveRoomError,
    IRemoveRoomRequest,
    REMOVE_GROUP_STATUS,
    IRemoveContactSuccess,
    IRemoveContactError,
    IRemoveContactRequest,
    IRemoveContactFormData,
    REMOVE_CONTACT_STATUS
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

type RetrieveRoomInfoDispatch = IRetreiveRoomInfoSuccess | IRetreiveRoomInfoError | IRetreiveRoomInfoRequest;

/**
 * Invokes the API call to retrieve a particular rooms info and updates the state of the request.
 * @param roomId string, uuid of the room
 */
export const retrieveRoomInfoAction = (roomId: string) => async (dispatch: Dispatch<RetrieveRoomInfoDispatch>) => {
    dispatch({ type: RETRIEVE_ROOM_DATA_STATUS.REQUEST });

    retrieveRoomInfoCall(roomId)
        .then(({ data }: { data: { data: IChatRoomInfo } }) => {
            dispatch({ type: RETRIEVE_ROOM_DATA_STATUS.SUCCESS, payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: RETRIEVE_ROOM_DATA_STATUS.ERROR, payload: error?.response?.data?.message });
        });
};

export const clearRoomInfoAction = () => async (dispatch: Dispatch<IClearRoomInfoRequest>) => {
    dispatch({ type: CLEAR_ROOM_DATA_STATUS.REQUEST });
}

type CreateMessageDispatch = ICreateMessageSuccess | ICreateMessageError | ICreateMessageRequest;

/**
 * Invokes the API call to retrieve a particular rooms info and updates the state of the request.
 * @param roomId string, uuid of the room
 */
export const createMessageAction = (formData: ISendMessageFormData) => async (dispatch: Dispatch<CreateMessageDispatch>) => {
    dispatch({ type: CREATE_MESSAGE_STATUS.REQUEST });

    createMessageCall(formData)
        .then(({ data }: { data: { data: IChatRoomMessageData } }) => {
            dispatch({ type: CREATE_MESSAGE_STATUS.SUCCESS, payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: CREATE_MESSAGE_STATUS.ERROR, payload: error?.response?.data?.message });
        });
};

type ReadRoomDispatch = IReadRoomSuccess | IReadRoomError | IReadRoomRequest;

/**
 * Invokes the API call to retrieve a particular rooms info and updates the state of the request.
 * @param roomId string, uuid of the room
 */
export const readRoomAction = (roomId: string) => async (dispatch: Dispatch<ReadRoomDispatch>) => {
    dispatch({ type: READ_ROOM_STATUS.REQUEST });

    readRoomCall(roomId)
        .then(({ data }: { data: { data: IChatRoomReadData } }) => {
            dispatch({ type: READ_ROOM_STATUS.SUCCESS, payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: READ_ROOM_STATUS.ERROR, payload: error?.response?.data?.message });
        });
};

type IncomingMessageDispatch = IIncomingMessageSuccess;

export const incomingMessageAction = (messageData: IChatRoomMessageIncomingWS) => async (dispatch: Dispatch<IncomingMessageDispatch>) => {
    dispatch({ type: INCOMING_ROOM_MESSAGE_STATUS.SUCCESS, payload: messageData });
}

export const onlineUsersAction = (data: IOnlineWS) => async (dispatch: Dispatch<IOnlineUsersSuccess>) => {
    dispatch({ type: INCOMING_USER_STATUS.ONLINE, payload: data.online });
}

export const startStopTypingAction = (data: ITypingWS, start: boolean) => async (dispatch: Dispatch<ITypingStatusSuccess>) => {
    dispatch({ type: start ? INCOMING_TYPING_STATUS.START : INCOMING_TYPING_STATUS.STOP, payload: data });
}

type RemoveRoomDispatch = IRemoveRoomSuccess | IRemoveRoomError | IRemoveRoomRequest;

/**
 * Invokes the API call to remove a particular room and updates the state of the request.
 * @param formData IRemoveRoomFormData
 */
export const removeRoomAction = (formData: IRemoveRoomFormData) => async (dispatch: Dispatch<RemoveRoomDispatch>) => {
    dispatch({ type: REMOVE_GROUP_STATUS.REQUEST });

    removeRoomCall(formData)
        .then(({ data }: { data: { data: IRemoveRoomFormData } }) => {
            dispatch({ type: REMOVE_GROUP_STATUS.SUCCESS, payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: REMOVE_GROUP_STATUS.ERROR, payload: error?.response?.data?.message });
        });
};

type RemoveContactDispatch = IRemoveContactSuccess | IRemoveContactError | IRemoveContactRequest;

/**
 * Invokes the API call to remove a particular contact and updates the state of the request.
 * @param formData IRemoveContactFormData
 */
export const removeContactAction = (formData: IRemoveContactFormData) => async (dispatch: Dispatch<RemoveContactDispatch>) => {
    dispatch({ type: REMOVE_CONTACT_STATUS.REQUEST });

    removeContactCall(formData)
        .then(({ data }: { data: { data: IRemoveContactFormData } }) => {
            dispatch({ type: REMOVE_CONTACT_STATUS.SUCCESS, payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: REMOVE_CONTACT_STATUS.ERROR, payload: error?.response?.data?.message });
        });
};