/**
 * Global helper reducer that holds loading, error states of dispatched actions,
 * works by assuming that the action type contains the state (_REQUEST, _SUCCESS, _ERROR)
*/

/**
 * Reducer state
*/
interface IHelperState {
    loading: boolean;
    error: null | string;
}

interface IHelperReducerState {
    [name: string]: IHelperState
}

/**
 * Reducer action
*/
interface IHelperReducerAction {
    type: string;
    payload: any;
}

export const helperReducer = (state = {} as IHelperReducerState, action: IHelperReducerAction) => {
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