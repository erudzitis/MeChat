import { io, Socket } from "socket.io-client";

// Constants
import { BASE_SOCKET_URL } from "./contants";

// Services
import { getAccessToken } from "./services";

// Hooks
import { IChatRoom, IContact, ISendMessageFormData } from "./types";

export class WS {
    private connection: Socket | null = null;
    static ON_CONNECT = "connect";
    static ROOM_CONNECT = "room_connect";
    static ROOM_DISCONNECT = "room_disconnect";
    static ROOM_MESSAGE = "room_message";
    static ROOM_INCOMING_MESSAGE = "receive_room_message";
    static ONLINE_USERS = "online_users";
    static USER_DISCONNECTED = "user_disconnected";
    static START_TYPING = "start_typing";
    static END_TYPING = "stop_typing";
    static START_TYPING_INCOMING = "receive_start_typing";
    static STOP_TYPING_INCOMING = "receive_stop_typing";

    public connect() {
        // We already have existing connection
        if (this.getInstance()) return;

        this.connection = io(BASE_SOCKET_URL, {
            auth: (cb) => {
                cb({ token: getAccessToken() });
            }
        });

        this.connection.on("connect_error", (_) => {
            setTimeout(() => this.connection!.connect(), 1000);
        });
    }

    public disconnect() {
        // We don't have an existing connection
        if (!this.getInstance()) return;
    }

    private joinLeaveRooms(rooms: Array<IChatRoom>, contacts: Array<IContact>, join: boolean) {
        if (!this.isConnected()) return;

        this.getInstance()!.emit(join ? WS.ROOM_CONNECT : WS.ROOM_DISCONNECT, {
            contactRooms: contacts.map(c => c.room_id),
            groupRooms: rooms.map(r => r.id),
        });
    }

    public joinRooms(rooms: Array<IChatRoom>, contacts: Array<IContact>) {
        this.joinLeaveRooms(rooms, contacts, true);
    }

    public leaveRooms(rooms: Array<IChatRoom>, contacts: Array<IContact>) {
        this.joinLeaveRooms(rooms, contacts, false);
    }

    public sendMessage(data: ISendMessageFormData) {
        if (!this.isConnected()) return;

        this.getInstance()!.emit(WS.ROOM_MESSAGE, data);
    }

    private startStopTyping(roomId: string, start: boolean) {
        if (!this.isConnected()) return;

        this.getInstance()!.emit(start ? WS.START_TYPING : WS.END_TYPING, { roomId });
    }

    public startTyping(roomId: string) {
        this.startStopTyping(roomId, true);
    }

    public stopTyping(roomId: string) {
        this.startStopTyping(roomId, false);
    }

    public isConnected() {
        return this.connection != null && this.connection.connected;
    }

    public getInstance() {
        return this.connection;
    }
};

export const ws = new WS();