const mongoose = require("mongoose");
const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  projectStatus: {
    type: String
  },
  dateDue: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }], 
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
