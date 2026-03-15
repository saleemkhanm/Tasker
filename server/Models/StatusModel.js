const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const StatusSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    icon: {
        type: String,
        required: true
    },
},
    {
    timestamps: true, 
}

);

const Status = mongoose.model("Status", StatusSchema);
module.exports = Status;