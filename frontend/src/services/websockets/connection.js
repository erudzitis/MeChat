// socket.io
import io from "socket.io-client";

export const socket = io("http://localhost:8000", { 
    auth: {
        token: localStorage.getItem("chatApplicationToken")
    }
});