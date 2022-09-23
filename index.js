// Express async error handler middleware
require("express-async-errors");

// Requirements
const express = require("express");

// Connecting to db
require("./database/connect");

// Loading enviroment variables
require("dotenv").config();

// Global instances
const app = express();
const PORT = process.env.PORT | 8000;

// Middleware
app.use(express.json());

// Init
app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}...`);
})