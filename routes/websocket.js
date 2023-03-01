// Requirements
const jwt = require("jsonwebtoken");

// Storage for online users
const online = {};

// Helper function for updating online users state
const updateOnlineState = (userId) => {
    online[userId] = true;
}

const deleteOnlineState = (userId) => {
    if (userId in online) {
        delete online[userId];
    }
}

const getOnlineState = () => {
    return online;
}

module.exports = (socket) => {
    socket.use((s, next) => {
        const token = s.handshake.auth.token;

        // Verifying token
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            // An error has occured
            if (error) {
                return next(new Error(error));
            }

            // Verification was successful
            s.userId = decoded.id;
            s.username = decoded.username;

            next();
        });
    })

    socket.on("connection", client => {
        console.log(`client has connected: ${client.id}, ${client.userId}, ${client.username}`);

        // Updating state
        updateOnlineState(client.userId);

        // Informing all sockets of newly joined online user
        socket.emit("online_users", { online: getOnlineState() });

        // Event that gets called after user enters a room
        client.on("room_connect", data => {
            const { contactRooms = [], groupRooms = [] } = data;

            // Connecting client socket to all rooms
            contactRooms.forEach(room => client.join(room));
            groupRooms.forEach(room => client.join(room));
        });

        // Event that gets called after the user leaves a room
        client.on("room_disconnect", data => {
            const { contactRooms = [], groupRooms = [] } = data;

            // Disconnecting client socket from all rooms
            contactRooms.forEach(room => client.leave(room));
            groupRooms.forEach(room => client.leave(room));
        });

        // Event that gets called when a chat message is submitted
        client.on("room_message", data => {
            const { content, roomId } = data;

            // Emitting message data to all other sockets listening in the same room, except the sender
            client.to(roomId).emit("receive_room_message", {
                user_id: client.userId,
                room_id: roomId,
                username: client.username,
                content,
                created_at: new Date(),
            })
        });

        // Event that gets called every time user starts typing
        client.on("start_typing", data => {
            const { roomId } = data;

            client.to(roomId).emit("receive_start_typing", {
                user_id: client.userId,
                room_id: roomId
            })
        });

        // Event that gets called every time user stops typing
        client.on("stop_typing", data => {
            const { roomId } = data;

            client.to(roomId).emit("receive_stop_typing", {
                user_id: client.userId,
                room_id: roomId
            })
        });

        // Keeping track of users disconnecting
        client.on("disconnecting", () => {
            // Updating the state
            deleteOnlineState(client.userId);

            // Informing all sockets that user is now 'offline'
            socket.emit("user_disconnected", { online: getOnlineState() });
        });
    })
}