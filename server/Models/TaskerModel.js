const mongoose = require('mongoose');
const { Schema,SchemaTypes, model } = require("mongoose");

const TaskerSchema = new Schema(
{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    dueTime: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      required: true,
    },
    categoryId: {
      type: SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
    statusId: {
      type: SchemaTypes.ObjectId,
      ref: 'Status',
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tasker = mongoose.model("Tasker", TaskerSchema);
module.exports = Tasker;