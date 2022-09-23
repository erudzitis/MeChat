// Express async error handler middleware
require("express-async-errors");

// Loading enviroment variables
require("dotenv").config();

// Requirements
const express = require("express");
const cors = require("cors");
const authenticationRoutes = require("./routes/authentication");
const errorHandlerMiddleware = require("./middleware/errorHandler");

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

// Error handling middleware
app.use(errorHandlerMiddleware);

// Init
app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}...`);
})