const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  projectStatus: {
    type: String
  },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }], 
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
