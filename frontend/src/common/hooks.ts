// Imports
import { useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ReducerState, TypedDispatch } from "../reducers";
import jwtDecode from "jwt-decode";

// Types
import { IChatRoomHook, IModalHook, IContactsHook, IUserHook, IChatRoom, IContact, IChatRoomMessageIncomingWS, IOnline, IOnlineWS, ITypingWS } from "./types";

// Actions
import { retrieveContactsAction, retrieveRoomsAction, incomingMessageAction, onlineUsersAction, startStopTypingAction } from "../actions/chat";

// Services
import { getAccessToken } from "./services";

// Websocket
import { ws, WS } from "./websocket";

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

/**
 * Hook for retrieving local user data
 */
export const UseGetUser = (): IUserHook | null => {
    const token = getAccessToken();

    return useMemo(() => {
        return token ? jwtDecode(token) : null;
    }, [token]);
};

export const UseWS = () => {
    const dispatch = useAppDispatch();
    const { rooms, contacts }: { rooms: Array<IChatRoom>, contacts: Array<IContact> } = useAppSelector(state => state.chat);

    useEffect(() => {
        // Establishing connection
        ws.connect();

        // Listening for incoming messages
        ws.getInstance()?.on(WS.ROOM_INCOMING_MESSAGE, (data: IChatRoomMessageIncomingWS) => {
            console.log(WS.ROOM_INCOMING_MESSAGE);

            dispatch(incomingMessageAction(data));
        });

        // Listening for incoming online users message
        ws.getInstance()?.on(WS.ONLINE_USERS, (data: IOnlineWS) => {
            console.log(WS.ONLINE_USERS);

            dispatch(onlineUsersAction(data));
        });

        // Listening for incoming offline users message
        ws.getInstance()?.on(WS.USER_DISCONNECTED, (data: IOnlineWS) => {
            console.log(WS.USER_DISCONNECTED);

            dispatch(onlineUsersAction(data));
        });

        // Listening for incoming user typing message
        ws.getInstance()?.on(WS.START_TYPING_INCOMING, (data: ITypingWS) => {
            console.log(WS.START_TYPING_INCOMING);

            dispatch(startStopTypingAction(data, true));
        });


        // Listening for incoming user stopped typing message
        ws.getInstance()?.on(WS.STOP_TYPING_INCOMING, (data: ITypingWS) => {
            console.log(WS.STOP_TYPING_INCOMING);

            dispatch(startStopTypingAction(data, false));
        });


        // Cleanup
        return () => {
            ws.leaveRooms(rooms, contacts);
            ws.getInstance()?.off(WS.ON_CONNECT);
            ws.getInstance()?.off(WS.ROOM_INCOMING_MESSAGE);
            ws.getInstance()?.off(WS.ONLINE_USERS);
            ws.getInstance()?.off(WS.USER_DISCONNECTED);
            ws.getInstance()?.off(WS.START_TYPING_INCOMING);
            ws.getInstance()?.off(WS.STOP_TYPING_INCOMING);
        }
    }, []);

    useEffect(() => {
        // Joining all rooms
        if (rooms.length && contacts.length && ws.isConnected()) {
            console.log("JOINING ROOMS!");
            console.log(rooms);
            console.log(contacts);

            ws.joinRooms(rooms, contacts);
        };
    }, [rooms.length, contacts.length, ws.isConnected()]);

    useEffect(() => {
        console.log("useEffect is connected: " + ws.isConnected());
        
    }, [ws.isConnected()])
}