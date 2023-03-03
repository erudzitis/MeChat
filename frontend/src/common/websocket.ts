import { io, Socket } from "socket.io-client";

// Constants
import { ACCESS_TOKEN_EXPIRED_WS, ACCESS_TOKEN_SET, BASE_SOCKET_URL } from "./contants";

// Services
import { getAccessToken } from "./services";

// Types
import { IChatRoom, IContact, ISendMessageFormData } from "./types";

export class WS {
    private connection: Socket | null = null;
    private connectionPending = false;
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
        // We already have existing or pending connection
        if (this.getInstance() || this.connectionPending) return;

        this.connection = io(BASE_SOCKET_URL, {
            auth: (cb) => {
                cb({ token: getAccessToken() });
            }
        });

        // Updating state
        this.connectionPending = true;

        /**
         * We experienced error when connecting,
         * this could be that our access token had expired at the moment,
         * if so, we listen for token changes
         */
        this.connection.on("connect_error", (error) => {
            if (error.message != ACCESS_TOKEN_EXPIRED_WS) return;

            const reconnect = () => {
                console.log("Access token changed, reconnecting");
                
                this.connection!.connect();
            }

            // Listening for access token changes
            window.addEventListener(ACCESS_TOKEN_SET, reconnect);

            // Removing listener on successful connection
            this.connection?.on("connection", () => window.removeEventListener(ACCESS_TOKEN_SET, reconnect));

        });
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