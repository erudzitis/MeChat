// Global helper reducer that holds loading, error states of dispatched actions,
// works by assuming that the action type contains the state (_REQUEST, _SUCCESS, _ERROR)
const helperReducer = (state = {}, action) => {
    const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(action.type);

    // Request type doesn't match regex
    if (!matches) {
        return state;
    }

    // array of all matching strings
    const [dispatchedType, requestName, requestState] = matches;

    return {
        ...state,
        [requestName]: { loading: requestState === "REQUEST", error: requestState === "ERROR" ? action.payload : null }
    }
}

export default helperReducer;