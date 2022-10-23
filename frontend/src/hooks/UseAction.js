// Requirements
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const UseAction = (action, ...rest) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Checking if arguments don't contain null values
        if (rest.indexOf(null) >= 0) return;

        // Creating abort controller
        const abortController = new AbortController();
        // dispatching the action
        dispatch(action(...rest, abortController.signal));
        // Aborting request on component unmount
        return () => {
            abortController.abort();
        }
    }, [...rest]);
}

export default UseAction;