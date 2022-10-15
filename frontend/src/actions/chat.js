// local imports
import { createRoomAPICall, retrieveContactsAPICall, establishContactAPICall, removeContactAPICall, retrieveRoomsAPICall, createMessageAPICall, retrieveRoomDataAPICall } from "../api";

const createRoomAction = (formData) => async (dispatch) => {
    dispatch({ type: "CREATE_ROOM_REQUEST" });

    createRoomAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "CREATE_ROOM_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: "CREATE_ROOM_ERROR", payload: error?.response?.data?.message });
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

const establishContactAction = (formData) => async (dispatch) => {
    dispatch({ type: "ESTABLISH_CONTACT_REQUEST" });

    establishContactAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "ESTABLISH_CONTACT_SUCCESS", payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: "ESTABLISH_CONTACT_ERROR", payload: error?.response?.data?.message });
        })
}

const removeContactAction = (formData) => async (dispatch) => {
    dispatch({ type: "REMOVE_CONTACT_REQUEST" });

    removeContactAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "REMOVE_CONTACT_SUCCESS", payload: data.data });
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

const retrieveRoomDataAction = (formData) => async (dispatch) => {
    dispatch({ type: "RETRIEVE_ROOM_DATA_REQUEST" });

    retrieveRoomDataAPICall(formData)
        .then(({ data }) => {
            dispatch({ type: "RETRIEVE_ROOM_DATA_SUCCESS", payload: {
                roomId: formData.roomId,
                messages: data.data.messages,
                participants: data.data.participants
            }});
        })
        .catch((error) => {
            dispatch({ type: "RETRIEVE_ROOM_DATA_ERROR", payload: error?.response?.data?.message });
        })
}

const clearRoomDataAction = () => async (dispatch) => {
    dispatch({ type: "CLEAR_ROOM_DATA_SUCCESS" });
}

export {
    createRoomAction,
    retrieveContactsAction,
    retrieveRoomsAction,
    createMessageAction,
    retrieveRoomDataAction,
    clearRoomDataAction,
    establishContactAction,
    removeContactAction
}