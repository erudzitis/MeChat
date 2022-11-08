const initialState = {
    typingUsers: {}, // Dictionary that holds typing users per each room
    roomData: null, // Hold the currently selected rooms data, otherwise gets cleared to null
    onlineUsers: [], // Holds list of indexes of users that are online and in your contacts list
    contacts: [], // Holds list of user objects that are in your contacts list
    rooms: [], // Holds list of room objects that you are apart of
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_ROOM_SUCCESS":
            return { ...state, rooms: [...state.rooms, action.payload] };
        case "LEAVE_ROOM_SUCCESS":
            return { ...state, rooms: state.rooms.filter(room => room.id !== action.payload.leftRoomId) };
        case "CREATE_MESSAGE_SUCCESS":
            return { ...state, roomData: { ...state.roomData, messages: [...state.roomData.messages, action.payload] } };
        case "RETRIEVE_CONTACTS_SUCCESS":
            return { ...state, contacts: action.payload };
        case "ESTABLISH_CONTACT_SUCCESS":
            return { ...state, contacts: [...state.contacts, action.payload] };
        case "REMOVE_CONTACT_SUCCESS":
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload.removedContactId),
                rooms: state.rooms.filter(room => room.id !== action.payload.removedRoomId),
            };
        case "RETRIEVE_ROOMS_SUCCESS":
            return { ...state, rooms: action.payload };
        case "RETRIEVE_ROOM_DATA_SUCCESS":
            return { ...state, roomData: action.payload };
        case "ADD_ROOM_USER_SUCCESS":
            return { ...state, roomData: { ...state.roomData, participants: [...state.roomData.participants, { id: action.payload.user_id }] } };
        case "CLEAR_ROOM_DATA_SUCCESS":
            return { ...state, roomData: null };
        case "RETRIEVE_ONLINE_USERS_SUCCESS":
            return { ...state, onlineUsers: action.payload };
        case "RETRIEVE_TYPING_USER_SUCCESS":
            return {
                ...state,
                typingUsers: { 
                    ...state.typingUsers, 
                    [action.payload.roomId]: state.typingUsers[action.payload.roomId] ? [...state.typingUsers[action.payload.roomId], action.payload.userId] : [action.payload.userId] 
                }
            };
        case "RETRIEVE_NOT_TYPING_USER_SUCCESS":
            return {
                ...state,
                typingUsers: { ...state.typingUsers, [action.payload.roomId]: state.typingUsers[action.payload.roomId].filter(typingUser => typingUser !== action.payload.userId) }
            };
        default:
            return state;
    }
}

export default chatReducer;