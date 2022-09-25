const chatReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_ROOM_SUCCESS":
            return state;
        default:
            return state;
    }
}

export default chatReducer;