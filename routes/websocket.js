// Online users storage 
const onlineUsers = {};

module.exports = (socket) => {
    socket.on("connection", client => {
        console.log(`client has connected: ${client.id}`);

        // Event that gets called after user enters a room
        client.on("room_connect", data => {
            const { contactRooms, groupRooms } = data;

            // Connecting to all contact rooms
            // Connecting socket to the room
            contactRooms.forEach(room => client.join(room) );
            groupRooms.forEach(room => client.join(room) );
    })


    // Event that gets called when a chat message is submitted
    client.on("room_message", data => {
        const { content, username, roomId, userId } = data;

        // Emitting message data to all other sockets listening in the same room, except the sender
        client.to(roomId).emit("receive_room_message", {
            content,
            username,
            created_at: new Date(),
            room_id: roomId,
            user_id: userId
        })
    })

    // Event that gets called once client connects
    client.on("client_connect", data => {
        const { userId } = data;

        // Initializing user into online users array
        onlineUsers[client.id] = userId;

        // Informing all sockets
        socket.emit("receive_online_users", {
            onlineUsers: Object.values(onlineUsers)
        })
    })

    // Keeping track of users disconnecting
    client.on("disconnect", () => {
        // Removing user from online users array
        delete onlineUsers[client.id];

        // Informing all sockets
        socket.emit("receive_online_users", {
            onlineUsers: Object.values(onlineUsers)
        })
    })

    // Event that gets called every time user starts typing
    client.on("user_typing", data => {
        const { roomId, userId } = data;

        client.to(roomId).emit("receive_user_typing", {
            userId,
            roomId
        })
    })

    // Event that gets called every time user stops typing
    client.on("user_not_typing", data => {
        const { roomId, userId } = data;

        client.to(roomId).emit("receive_user_not_typing", {
            userId,
            roomId
        })
    })
})
}