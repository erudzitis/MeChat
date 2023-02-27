// Requirements
const jwt = require("jsonwebtoken");

// Online users storage 
const onlineUsers = {};

module.exports = (socket) => {
    socket.use((s, next) => {
        const token = s.handshake.auth.token;

        // Verifying token
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            // An error has occured
            if (error) {
                next(new Error(error));
            }

            // Verification was successful
            s.userId = decoded.id;
            s.username = decoded.username;

            next();
        });
    })

    socket.on("connection", client => {
        console.log(`client has connected: ${client.id}, ${client.userId}, ${client.username}`);
        // Initializing user into online users array
        onlineUsers[client.userId] = 1;

        // Informing all sockets of the newly connected user
        // TODO: Ideally you don't want to notice all the sockets, especially those that are not
        // associated to this user in any way, for instance, not being a friend
        socket.emit("receive_online_users", {
            onlineUsers: Object.values(onlineUsers)
        });

        // Event that gets called after user enters a room
        client.on("room_connect", data => {
            const { contactRooms = [], groupRooms = [] } = data;

            console.log("room_connect " + client.username);

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

            console.log(data);

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
        client.on("user_typing", data => {
            const { roomId } = data;

            client.to(roomId).emit("receive_user_typing", {
                userId: client.userId,
                roomId
            })
        });

        // Event that gets called every time user stops typing
        client.on("user_not_typing", data => {
            const { roomId } = data;

            client.to(roomId).emit("receive_user_not_typing", {
                userId: client.userId,
                roomId
            })
        });

        // Event that gets called every time a user initializes room call
        client.on("initialize_room_call", data => {
            const { roomId } = data;

            // Going over all other client sockets in the same room and sending them information about this incoming call
            client.to(roomId).emit("incoming_room_call", { roomId, callerId: client.userId });
        });

        client.on("abort_room_call", data => {
            const { roomId } = data;

            // Going over all other client sockets in the same room and sending them information about this incoming call
            client.to(roomId).emit("ended_room_call", { roomId });
        });

        // Keeping track of users disconnecting
        client.on("disconnect", () => {
            // Removing user from online users array
            delete onlineUsers[client.userId];

            // Informing all sockets
            socket.emit("receive_online_users", {
                onlineUsers: Object.values(onlineUsers)
            })
        });

    })
}