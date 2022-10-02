const chatReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_ROOM_SUCCESS":
            return { ...state, rooms: [ ...state.rooms, action.payload ] };
        case "CREATE_MESSAGE_SUCCESS":
            return { ...state, roomData: { ...state.roomData, messages: [ ...state.roomData.messages, action.payload ] }}
        case "RETRIEVE_CONTACTS_SUCCESS":
            return { ...state, contacts: action.payload };
        case "RETRIEVE_ROOMS_SUCCESS":
            return { ...state, rooms: action.payload };
        case "RETRIEVE_ROOM_DATA_SUCCESS": 
            return { ...state, roomData: action.payload };
        case "CLEAR_ROOM_DATA_SUCCESS":
            return { ...state, roomData: null };
        default:
            return state;
    }
}

export default chatReducer;