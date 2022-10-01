// local imports
import { createRoomAPICall, retrieveContactsAPICall, retrieveRoomsAPICall } from "../api";

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

export {
    createRoomAction,
    retrieveContactsAction,
    retrieveRoomsAction
}