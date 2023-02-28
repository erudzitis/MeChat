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
    ICreateMessageSuccess,
    IReadRoomSuccess,
    READ_ROOM_STATUS,
    IIncomingMessageSuccess,
    INCOMING_ROOM_MESSAGE_STATUS,
    INCOMING_USER_STATUS,
    IOnlineUsersSuccess,
    IOnline,
    INCOMING_TYPING_STATUS,
    ITypingStatusSuccess,
} from "../common/types"

type ChatReducerAction = IRetrieveRoomSuccess | IRetrieveContactsSuccess | IAddFriendSuccess | ICreateGroupSuccess
    | IRetreiveRoomInfoSuccess | IClearRoomInfoRequest | ICreateMessageSuccess | IReadRoomSuccess | IIncomingMessageSuccess
    | IOnlineUsersSuccess | ITypingStatusSuccess;

interface IChatState {
    rooms: Array<IChatRoom>;
    contacts: Array<IContact>;
    roomData: IChatRoomInfo | null;
    online: IOnline
}

const initialState = {
    rooms: [],
    contacts: [],
    roomData: null,
    online: {}
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
            return {
                ...state,
                roomData: { ...state.roomData, messages: [...state.roomData!.messages, action.payload] }
            };
        case INCOMING_ROOM_MESSAGE_STATUS.SUCCESS:
            // The incoming message was in the same chat room that we have open at the moment
            if (state.roomData?.id === action.payload.room_id) {
                return {
                    ...state,
                    roomData: { ...state.roomData, messages: [...state.roomData!.messages, action.payload] }
                };
            } else {
                // The incoming message was in a different room
                // We update latest room message of that particular room
                return {
                    ...state,
                    rooms: state.rooms.map(r => {
                        if (r.id === action.payload.room_id) {
                            r.latest_msg_content = action.payload.content;
                            r.latest_msg_date = action.payload.created_at;
                            r.latest_msg_username = action.payload.username;
                        }

                        return r;
                    }),
                    contacts: state.contacts.map(c => {
                        if (c.room_id === action.payload.room_id) {
                            c.latest_msg_content = action.payload.content;
                            c.latest_msg_date = action.payload.created_at;
                            c.latest_msg_username = action.payload.username;
                        }

                        return c;
                    }),
                }
            }
        case READ_ROOM_STATUS.SUCCESS:
            return {
                ...state,
                rooms: state.rooms.map(room => room.id === action.payload.room_id ? { ...room, read_at: action.payload.read_at } : room)
            }
        case INCOMING_USER_STATUS.ONLINE:
            return { ...state, online: action.payload };
        case INCOMING_TYPING_STATUS.START:
            return state.roomData?.id === action.payload.room_id
                ? { ...state, roomData: { ...state.roomData, typing: { ...state.roomData.typing, [action.payload.user_id]: true } } }
                : state;
        case INCOMING_TYPING_STATUS.STOP:
            return state.roomData?.id === action.payload.room_id
                ? { ...state, roomData: { ...state.roomData, typing: { ...state.roomData.typing, [action.payload.user_id]: false } } }
                : state;
        default:
            return state;
    }
}