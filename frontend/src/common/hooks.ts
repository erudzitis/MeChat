// Imports
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ReducerState, TypedDispatch } from "../reducers";

import { IChatRoomHook, IModalHook, IContactsHook } from "./types";

import { retrieveContactsAction, retrieveRoomsAction } from "../actions/chat";

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

// TODO: Think if there's a way to make a generic method for these hooks
/**
 * Hook for retreiving the list of contacts that the user has
 */
export const useGetContacts = (): IContactsHook => {
    const dispatch = useAppDispatch();

    const { RETRIEVE_CONTACTS } = useAppSelector(state => state.helper);
    const { contacts } = useAppSelector(state => state.chat);

    useEffect(() => {
        dispatch(retrieveContactsAction());
    }, []);

    return {
        data: contacts,
        loading: RETRIEVE_CONTACTS?.loading,
        error: RETRIEVE_CONTACTS?.error
    }
};

/**
 * Hook for handling modal state with ease
 */
export const useModal = (): IModalHook => {
    const [opened, handlers] = useDisclosure(false);

    return {
        isOpen: opened,
        open: () => handlers.open(),
        close: () => handlers.close(),
        toggle: () => handlers.toggle()
    }
};