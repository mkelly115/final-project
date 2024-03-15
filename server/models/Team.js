const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
