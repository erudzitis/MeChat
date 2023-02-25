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
    ICreateGroupSuccess,
    IChatRoomInfo,
    RETRIEVE_ROOM_DATA_STATUS,
    IRetreiveRoomInfoSuccess,
    IClearRoomInfoRequest,
    CLEAR_ROOM_DATA_STATUS,
    CREATE_MESSAGE_STATUS,
    ICreateMessageSuccess
} from "../common/types"

type ChatReducerAction = IRetrieveRoomSuccess | IRetrieveContactsSuccess | IAddFriendSuccess | ICreateGroupSuccess 
    | IRetreiveRoomInfoSuccess | IClearRoomInfoRequest | ICreateMessageSuccess;

interface IChatState {
    rooms: Array<IChatRoom>;
    contacts: Array<IContact>;
    roomData: IChatRoomInfo | null;
}

const initialState = {
    rooms: [],
    contacts: [],
    roomData: null
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
        case RETRIEVE_ROOM_DATA_STATUS.SUCCESS:
            return { ...state, roomData: action.payload };
        case CLEAR_ROOM_DATA_STATUS.REQUEST:
            return { ...state, roomData: null };
        case CREATE_MESSAGE_STATUS.SUCCESS:
            return { ...state, 
                roomData: { ...state.roomData, messages: [ ...state.roomData!.messages, action.payload ] } 
            };    
        default:
            return state;
    }
}