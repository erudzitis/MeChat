// Express async error handler middleware
require("express-async-errors");

// Loading enviroment variables
require("dotenv").config();

// Requirements
const express = require("express");
const cors = require("cors");

const authenticationRoutes = require("./routes/authentication");
const roomRoutes = require("./routes/room");
const messageRoutes = require("./routes/message");

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

// Error handling middleware
app.use(errorHandlerMiddleware);

// Init
app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}...`);
})