const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER_SUCCESS":
            // Updating authorization token
            localStorage.setItem("chatApplicationToken", action.payload);

            return state;
        case "LOGIN_SUCCESS":
            // Updating authorization token
            localStorage.setItem("chatApplicationToken", action.payload);

            return state;
    }
}

export default authReducer;