// Types
import {
    IChatRoom,
    RETRIEVE_ROOMS_STATUS,
    IRetrieveRoomSuccess,
    IRetrieveContactsSuccess,
    IContact,
    RETRIEVE_CONTACTS_STATUS,
    ADD_FRIEND_STATUS,
    IAddFriendSuccess,
    CREATE_GROUP_STATUS,
    ICreateGroupSuccess
} from "../common/types"

type ChatReducerAction = IRetrieveRoomSuccess | IRetrieveContactsSuccess | IAddFriendSuccess | ICreateGroupSuccess;

interface IChatState {
    rooms: Array<IChatRoom>;
    contacts: Array<IContact>;
}

const initialState = {
    rooms: [],
    contacts: []
} as IChatState;

export const chatReducer = (state = initialState, action: ChatReducerAction) => {
    switch (action.type) {
        case RETRIEVE_ROOMS_STATUS.SUCCESS:
            return { ...state, rooms: action.payload };
        case RETRIEVE_CONTACTS_STATUS.SUCCESS:
            return { ...state, contacts: action.payload };
        case ADD_FRIEND_STATUS.SUCCESS:
            return { ...state, contacts: [action.payload, ...state.contacts] };
        case CREATE_GROUP_STATUS.SUCCESS:
            return { ...state, rooms: [action.payload, ...state.rooms] };
        default:
            return state;
    }
}