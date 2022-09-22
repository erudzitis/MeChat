// Requirements
const express = require("express");

// Loading enviroment variables
require("dotenv").config();

// Global instances
const app = express();
const PORT = process.env.PORT | 8000;

// Init
app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}...`);
})