const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectsSchema = new Schema({
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

const Projects = mongoose.model("Projects", projectsSchema);

module.exports = Projects;
