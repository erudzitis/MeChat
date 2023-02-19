import { Dispatch } from "redux";

// API endpoint calls
import { retrieveRoomsCall } from "../api";

// Types
import { IRetrieveRoomSuccess, IRetrieveRoomError, IRetrieveRoomRequest, IChatRoom, RETRIEVE_ROOMS_STATUS } from "../common/types";

type RetrieveRoomsDispatch = IRetrieveRoomSuccess | IRetrieveRoomError | IRetrieveRoomRequest;

/**
 * Invokes the API call to retrieve list of contacts and updates the state of the request.
 * @param formData ILoginFormData
 * @returns 
 */
export const retrieveRoomsAction = () => async (dispatch: Dispatch<RetrieveRoomsDispatch>) => {
    dispatch({ type: RETRIEVE_ROOMS_STATUS.REQUEST });

    retrieveRoomsCall()
        .then(({ data }: { data: { data: Array<IChatRoom>, success: boolean }}) => {
            dispatch({ type: RETRIEVE_ROOMS_STATUS.SUCCESS, payload: data.data });
        })
        .catch((error) => {
            dispatch({ type: RETRIEVE_ROOMS_STATUS.ERROR, payload: error?.response?.data?.message });
        })
};