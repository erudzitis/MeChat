const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER_SUCCESS":
            // Updating authorization token
            localStorage.setItem("chatApplicationToken", action.payload);
            // Triggering storage listener
            setTimeout(() => {
                window.dispatchEvent(new Event("storage"));
            })

            return state;
        case "LOGIN_SUCCESS":
            // Updating authorization token
            localStorage.setItem("chatApplicationToken", action.payload);
            // Triggering storage listener
            setTimeout(() => {
                window.dispatchEvent(new Event("storage"));
            })

            return state;
        case "LOGOUT_SUCCESS":
            return { ...state, userData: null };
        case "USER_DATA":
            return { ...state, userData: action.payload };
        default:
            return state;
    }
}

export default authReducer;