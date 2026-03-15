const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },
},
    {
    timestamps: true, 
}

);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;