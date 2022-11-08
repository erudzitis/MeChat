// Requirements
import { isCancel } from "axios";

// local imports
import {
    createRoomAPICall,
    leaveRoomAPICall, 
    retrieveContactsAPICall,
    establishContactAPICall, 
    removeContactAPICall, 
    retrieveRoomsAPICall, 
    createMessageAPICall, 
    retrieveRoomDataAPICall, 
    addRoomUserAPICall
} from "../api";

// error handler
export const chatErrorHandlerWrapper = (error, cb) => {
    // Axios cancel request error, coming from component unmount, we ignore it
    if (isCancel(error)) return;
    // Otherwise we dispatch the error
    cb();
}

export const createRoomAction = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "CREATE_ROOM_REQUEST" });

    createRoomAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "CREATE_ROOM_SUCCESS", payload: data.data });
            // Navigating to the group chat room
            navigate({
                search: `?roomId=${data.data.id}`
            });
        })
        .catch((error) => {
            dispatch({ type: "CREATE_ROOM_ERROR", payload: error?.response?.data?.message });
        })
}

export const leaveRoomAction = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "LEAVE_ROOM_REQUEST" });

    leaveRoomAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "LEAVE_ROOM_SUCCESS", payload: data.data });
            // Navigating to the main page
            navigate({
                search: ""
            });
        })
        .catch((error) => {
            dispatch({ type: "LEAVE_ROOM_ERROR", payload: error?.response?.data?.message });
        })
}

export const retrieveContactsAction = (signal) => async (dispatch) => {
    dispatch({ type: "RETRIEVE_CONTACTS_REQUEST" });

    retrieveContactsAPICall(signal)
        .then(({ data }) => {
            dispatch({ type: "RETRIEVE_CONTACTS_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            chatErrorHandlerWrapper(error, dispatch({ type: "RETRIEVE_CONTACTS_ERROR", payload: error?.response?.data?.message }));
        })
}

export const establishContactAction = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "ESTABLISH_CONTACT_REQUEST" });

    establishContactAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "ESTABLISH_CONTACT_SUCCESS", payload: data.data });
            // Navigating to the contact chat room
            navigate({
                search: `?roomId=${data.data.room_id}`
            });
        })
        .catch((error) => {
            dispatch({ type: "ESTABLISH_CONTACT_ERROR", payload: error?.response?.data?.message });
        })
}

export const removeContactAction = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "REMOVE_CONTACT_REQUEST" });

    removeContactAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "REMOVE_CONTACT_SUCCESS", payload: data.data });
            // Removing url parameters
            navigate({
                search: ""
            })
        })
        .catch((error) => {
            dispatch({ type: "REMOVE_CONTACT_ERROR", payload: error?.response?.data?.message });
        })
}

export const retrieveRoomsAction = (signal) => async (dispatch) => {
    dispatch({ type: "RETRIEVE_ROOMS_REQUEST" });

    retrieveRoomsAPICall(signal)
        .then(({ data }) => {
            dispatch({ type: "RETRIEVE_ROOMS_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            chatErrorHandlerWrapper(error, dispatch({ type: "RETRIEVE_ROOMS_ERROR", payload: error?.response?.data?.message }));
        })
}

export const createMessageAction = (formData) => async (dispatch) => {
    dispatch({ type: "CREATE_MESSAGE_REQUEST" });

    createMessageAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "CREATE_MESSAGE_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: "CREATE_MESSAGE_ERROR", payload: error?.response?.data?.message });
        })
}

export const receivedMessageHandleAction = (data) => async (dispatch) => {
    dispatch({ type: "CREATE_MESSAGE_SUCCESS", payload: data });
}

export const receivedOnlineUsersHandleAction = (data) => async (dispatch) => {
    dispatch({ type: "RETRIEVE_ONLINE_USERS_SUCCESS", payload: data.onlineUsers });
}

export const receivedTypingUserHandleAction = (data) => async (dispatch) => {
    dispatch({ type: "RETRIEVE_TYPING_USER_SUCCESS", payload: data });
}

export const receivedNotTypingUserHandleAction = (data) => async (dispatch) => {
    dispatch({ type: "RETRIEVE_NOT_TYPING_USER_SUCCESS", payload: data });
}

export const retrieveRoomDataAction = (roomId, signal) => async (dispatch) => {
    dispatch({ type: "RETRIEVE_ROOM_DATA_REQUEST" });

    retrieveRoomDataAPICall(roomId, signal)
        .then(({ data }) => {
            dispatch({
                type: "RETRIEVE_ROOM_DATA_SUCCESS", payload: {
                    ...data.data,
                    roomId: roomId,
                    messages: data.data.messages,
                    participants: data.data.participants,
                }
            });
        })
        .catch((error) => {
            chatErrorHandlerWrapper(error, dispatch({ type: "RETRIEVE_ROOM_DATA_ERROR", payload: error?.response?.data?.message }));
        })
}

export const clearRoomDataAction = () => async (dispatch) => {
    dispatch({ type: "CLEAR_ROOM_DATA_SUCCESS" });
}

export const addRoomUserAction = (formData) => async (dispatch) => {
    dispatch({ type: "ADD_ROOM_USER_REQUEST" });

    addRoomUserAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "ADD_ROOM_USER_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: "ADD_ROOM_USER_ERROR", payload: error?.response?.data?.message });
        })
}
