// local imports
import { createRoomAPICall, leaveRoomAPICall, retrieveContactsAPICall, establishContactAPICall, removeContactAPICall, retrieveRoomsAPICall, createMessageAPICall, retrieveRoomDataAPICall, addRoomUserAPICall } from "../api";

const createRoomAction = (formData, navigate) => async (dispatch) => {
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

const leaveRoomAction = (formData, navigate) => async (dispatch) => {
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

const retrieveContactsAction = () => async (dispatch) => {
    dispatch({ type: "RETRIEVE_CONTACTS_REQUEST" });

    retrieveContactsAPICall()
        .then(({ data }) => {
            dispatch({ type: "RETRIEVE_CONTACTS_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: "RETRIEVE_CONTACTS_ERROR", payload: error?.response?.data?.message });
        })
}

const establishContactAction = (formData, navigate) => async (dispatch) => {
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

const removeContactAction = (formData, navigate) => async (dispatch) => {
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

const retrieveRoomsAction = () => async (dispatch) => {
    dispatch({ type: "RETRIEVE_ROOMS_REQUEST" });

    retrieveRoomsAPICall()
        .then(({ data }) => {
            dispatch({ type: "RETRIEVE_ROOMS_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: "RETRIEVE_ROOMS_ERROR", payload: error?.response?.data?.message });
        })
}

const createMessageAction = (formData) => async (dispatch) => {
    dispatch({ type: "CREATE_MESSAGE_REQUEST" });

    createMessageAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "CREATE_MESSAGE_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: "CREATE_MESSAGE_ERROR", payload: error?.response?.data?.message });
        })
}

const recievedMessageHandleAction = (data) => async (dispatch) => {
    dispatch({ type: "CREATE_MESSAGE_SUCCESS", payload: data });
}

const recievedOnlineUsersHandleAction = (data) => async (dispatch) => {
    dispatch({ type: "RETRIEVE_ONLINE_USERS_SUCCESS", payload: data.onlineUsers });
}

const retrieveRoomDataAction = (roomId) => async (dispatch) => {
    dispatch({ type: "RETRIEVE_ROOM_DATA_REQUEST" });

    retrieveRoomDataAPICall(roomId)
        .then(({ data }) => {
            dispatch({
                type: "RETRIEVE_ROOM_DATA_SUCCESS", payload: {
                    roomId: roomId,
                    messages: data.data.messages,
                    participants: data.data.participants
                }
            });
        })
        .catch((error) => {
            dispatch({ type: "RETRIEVE_ROOM_DATA_ERROR", payload: error?.response?.data?.message });
        })
}

const clearRoomDataAction = () => async (dispatch) => {
    dispatch({ type: "CLEAR_ROOM_DATA_SUCCESS" });
}

const addRoomUserAction = (formData) => async (dispatch) => {
    dispatch({ type: "ADD_ROOM_USER_REQUEST" });

    addRoomUserAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "ADD_ROOM_USER_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: "ADD_ROOM_USER_ERROR", payload: error?.response?.data?.message });
        })
}

export {
    createRoomAction,
    leaveRoomAction,
    retrieveContactsAction,
    retrieveRoomsAction,
    createMessageAction,
    retrieveRoomDataAction,
    clearRoomDataAction,
    establishContactAction,
    removeContactAction,
    addRoomUserAction,
    recievedMessageHandleAction,
    recievedOnlineUsersHandleAction
}