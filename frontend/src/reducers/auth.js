const initialState = {
    userData: {}
}

// Helper function that triggers a change event to localstorage
const dispatchNewStorageEvent = () => {
    setTimeout(() => {
        window.dispatchEvent(new Event("storage"));
    })
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_SUCCESS":
            // Updating authorization token
            localStorage.setItem("chatApplicationToken", action.payload);
            // Triggering storage listener
            dispatchNewStorageEvent();

            return state;
        case "LOGIN_SUCCESS":
            // Updating authorization token
            localStorage.setItem("chatApplicationToken", action.payload);
            // Triggering storage listener
            dispatchNewStorageEvent();

            return state;
        case "LOGOUT_SUCCESS":
            // Removing authorization token
            localStorage.removeItem("chatApplicationToken");

            return { ...state, userData: null };
        case "USER_DATA":
            return { ...state, userData: action.payload };
        default:
            return state;
    }
}

export default authReducer;