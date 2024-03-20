const mongoose = require("mongoose");
const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');

const taskSchema = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    taskStatus: {
      type: String,
      required: true
    },
    dateDue: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    },
    assignedUser: { type: Schema.Types.ObjectId, ref: "User" },
  },
 );

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
