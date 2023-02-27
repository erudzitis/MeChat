import { io, Socket } from "socket.io-client";

// Constants
import { BASE_SOCKET_URL } from "./contants";

// Services
import { getAccessToken } from "./services";

// Hooks
import { IChatRoom, IContact, ISendMessageFormData } from "./types";

export class WS {
    private connection: Socket | null = null;
    static ROOM_CONNECT = "room_connect";
    static ROOM_MESSAGE = "room_message";
    static ROOM_INCOMING_MESSAGE = "receive_room_message";

    connect() {
        // We already have existing connection
        if (this.getInstance()) return;

        this.connection = io(BASE_SOCKET_URL, {
            auth: {
                token: getAccessToken()
            }
        });
    }

    joinRooms(rooms: Array<IChatRoom>, contacts: Array<IContact>) {
        if (!this.isConnected()) return;

        this.getInstance()!.emit(WS.ROOM_CONNECT, {
            contactRooms: contacts.map(c => c.room_id),
            groupRooms: rooms.map(r => r.id),
        });
    }

    sendMessage(data: ISendMessageFormData) {
        if (!this.isConnected()) return;

        this.getInstance()!.emit(WS.ROOM_MESSAGE, data);
    }

    isConnected() {
        return this.connection != null && this.connection.connected;
    }

    getInstance() {
        return this.connection;
    }
};

export const ws = new WS();