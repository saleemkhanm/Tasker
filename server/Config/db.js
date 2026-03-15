const mongoose = require("mongoose");

async function DbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB is Connected Successfully ");

    }
    catch (err) {
        console.log("Error", err.message);

    }
} 

module.exports = DbConnection;