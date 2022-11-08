// Global helper reducer that holds loading, error states of dispatched actions,
// works by assuming that the action type contains the state (_REQUEST, _SUCCESS, _ERROR)

/*  ------------------- [ Example ] --------------------- 
dispatch("EXAMPLE_REQUEST"); // Initializes entry in helper state. Stripes off action, state now contains key 'EXAMPLE'

// SUCCESS and ERROR states have to be handled
APICall()
    .then((d) => {
        dispatch("EXAMPLE_SUCCESS");
    })
    .catch((d) => {
        dispatch("EXAMPLE_ERROR");
    })
*/ 

const helperReducer = (state = {}, action) => {
    const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(action.type);

    // Request type doesn't match regex
    if (!matches) {
        return state;
    }

    // array of all matching strings
    const [_, requestName, requestState] = matches;

    return {
        ...state,
        [requestName]: { loading: requestState === "REQUEST", error: requestState === "ERROR" ? action.payload : null }
    }
}

export default helperReducer;