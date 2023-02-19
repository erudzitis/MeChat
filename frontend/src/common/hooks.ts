// Imports
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ReducerState, TypedDispatch } from "../reducers";
import { IChatRoomHook } from "./types";

import { retrieveRoomsAction } from "../actions/chat";
import { logoutCall } from "../api";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReducerState> = useSelector;

/**
 * Hook for retreiving the list of rooms that the user has access to
 */
export const useGetRooms = (): IChatRoomHook => {
    const dispatch = useAppDispatch();

    const { RETRIEVE_ROOMS } = useAppSelector(state => state.helper);
    const { rooms } = useAppSelector(state => state.chat);

    useEffect(() => {
        dispatch(retrieveRoomsAction());
    }, []);

    return {
        data: rooms,
        loading: RETRIEVE_ROOMS?.loading,
        error: RETRIEVE_ROOMS?.error
    }
};