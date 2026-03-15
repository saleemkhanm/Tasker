const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
