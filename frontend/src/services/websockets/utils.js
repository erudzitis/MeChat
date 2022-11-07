import { socket } from "./connection";

export const websocketConstants = {
    CONNECT: "connect",
    RECEIVE_ROOM_MESSAGE: "receive_room_message",
    RECEIVE_ONLINE_USERS: "receive_online_users",
    CLIENT_CONNECT: "client_connect",
    ROOM_MESSAGE: "room_message",
    CONTACT_INITIATED: "contact_initated",
    USER_TYPING: "user_typing",
    USER_NOT_TYPING: "user_not_typing",
    RECEIVE_USER_TYPING: "receive_user_typing",
    RECEIVE_USER_NOT_TYPING: "receive_user_not_typing"
}

export const websocketUtils = {
    getSocketId: () => {
        return socket.id;
    },
    clientConnect: (userId) => {
        // Emitting initial connection event
        socket.emit(websocketConstants.CLIENT_CONNECT, { userId });
    },
    registerEvent: (eventName, callback) => {
        // Registering socket listen event
        socket.on(eventName, callback);
    },
    unregisterEvents: (...args) => {
        // Un-registering socket listen events
        args.forEach(eventName => {
            socket.off(eventName);
        })
    },
    emit: (eventName, data) => {
        // Emitting event
        socket.emit(eventName, data);
    }
};