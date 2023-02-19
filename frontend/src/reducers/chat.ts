// Types
import { IChatRoom, RETRIEVE_ROOMS_STATUS, IRetrieveRoomSuccess } from "../common/types"

type ChatReducerAction = IRetrieveRoomSuccess;

interface IChatState {
    rooms: Array<IChatRoom>;
}

const initialState = {
    rooms: []
} as IChatState;

export const chatReducer = (state = initialState, action: ChatReducerAction) => {
    switch (action.type) {
        case RETRIEVE_ROOMS_STATUS.SUCCESS:
            console.log(action.payload);
            
            return { ...state, rooms: action.payload };
        default:
            return state;
    }
}