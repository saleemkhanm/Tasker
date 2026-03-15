//  IMPORTS (The Toolbox)
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import your custom files
const DbConnection = require("./Config/db");
const UserRouter = require("./Routers/UserRouter");
const CategoryRouter = require("./Routers/CategoryRouter");
const TaskerRouter = require("./Routers/TaskerRouter");
const StatusRouter = require("./Routers/StatusRouter");
const { notFound, errorHandler } = require("./Middlewares/ErrorMiddleware");


// CONFIGURATION (The Secret Keys)
dotenv.config(); // Must be near the top so all files can see variables

DbConnection(); 

const app = express();

// GLOBAL MIDDLEWARES (The Security Guards)
// These must come BEFORE routes so they can process the data first

app.use(express.json()); // Allows the server to read JSON from req.body
app.use(cookieParser()); // Allows the server to read cookies for JWT

app.use(cors({
    origin: "http://localhost:5173", // Your Frontend URL
    credentials: true                // Important! Allows cookies to be sent/received
}));

// Serves images/files from the "uploads" folder
app.use("/uploads", express.static("uploads"));

// 5. ROUTES (The Map)
app.get("/", (req, res) => {
    res.send("API is Running!");
});

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/tasker", TaskerRouter);
app.use("/api/v1/status", StatusRouter);

//  ERROR HANDLING (The Safety Net)
// These must be at the BOTTOM. They only run if no routes match or an error occurs.

app.use(notFound);      // Catches 404 (Route not found)
app.use(errorHandler);  // Catches 500 (General server errors)

// SERVER START (Opening the Doors)
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log(` Express App is Ready on http://${host}:${port}`);
});