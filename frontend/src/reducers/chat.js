const chatReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_ROOM_SUCCESS":
            return state;
        case "RETRIEVE_CONTACTS_SUCCESS":
            return { ...state, contacts: action.payload };
        case "RETRIEVE_ROOMS_SUCCESS":
            return { ...state, rooms: action.payload };            
        default:
            return state;
    }
}

export default chatReducer;