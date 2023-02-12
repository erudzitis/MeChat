// Types
import { IChatRoom, RETRIEVE_ROOMS_STATUS } from "../common/types"

type RetrieveRoomsSuccess = {
    type: RETRIEVE_ROOMS_STATUS.SUCCESS;
    payload: Array<IChatRoom>;
}

type ChatReducerAction = RetrieveRoomsSuccess;

const initialState = {
    rooms: Array<IChatRoom>
}

export const chatReducer = (state = initialState, action: ChatReducerAction) => {
    switch (action.type) {
        case RETRIEVE_ROOMS_STATUS.SUCCESS:
            return { ...state, rooms: action.payload };
        default:
            return state;
    }
}