// Express async error handler middleware
require("express-async-errors");

// Loading enviroment variables
require("dotenv").config();

// Requirements
const express = require("express");
const cors = require("cors");
const io = require("socket.io");

const authenticationRoutes = require("./routes/authentication");
const roomRoutes = require("./routes/room");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");

const errorHandlerMiddleware = require("./middleware/errorHandler");
const authorizationMiddleware = require("./middleware/authorization");

// Connecting to db
require("./database/connect");

// Global instances
const app = express();
const PORT = process.env.PORT | 8000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Routing
app.use("/api/v1/auth", authenticationRoutes);
app.use("/api/v1/room", authorizationMiddleware, roomRoutes);
app.use("/api/v1/message", authorizationMiddleware, messageRoutes);
app.use("/api/v1/user", authorizationMiddleware, userRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

// Init
const server = app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}...`);
})

// Initializing socket connection
const socket = io(server, {
    cors: {
        origin: "*"
    }
});

// Websocket routing
const onlineUsers = {};

socket.on("connection", client => {
    console.log(`client has connected: ${client.id}`);

    client.on("room_connect", data => {
        const { roomId } = data;

        // Connecting socket to the room
        client.join(roomId);
    })


    client.on("room_message", data => {
        const { content, username, roomId, userId } = data;

        // Emitting message data to all other sockets listening in the same room
        client.to(roomId).emit("recieve_room_message", {
            content,
            username,
            created_at: new Date(),
            room_id: roomId,
            user_id: userId
        })
    })

    client.on("client_connect", data => {
        const { userId } = data;

        // Initializing user into online users array
        onlineUsers[client.id] = userId;

        // Informing all sockets
        socket.emit("online_users", {
            onlineUsers: Object.values(onlineUsers)
        })
    })

    // Keeping track of users disconnecting
    client.on("disconnect", () => {
        // Removing user from online users array
        delete onlineUsers[client.id];

        // Informing all sockets
        socket.emit("online_users", {
            onlineUsers: Object.values(onlineUsers)
        })
    })
})