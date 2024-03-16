const mongoose = require("mongoose");
const { Schema } = mongoose;

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
      required: false //flipped this off from true - seed was having major issues 
    },
    assignedUser: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Formats dateDue field and names the formatted date field "dueDate"
taskSchema.virtual("dueDate").get(function () {
  return this.dateDue.toLocaleDateString();
});

// Removes the dateDue field and replaces it with the dueDate virtual field.
taskSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.dateDue;
    ret.dueDate = doc.dueDate;
    return ret;
  },
});

const Task = mongoose.model("Tasks", taskSchema);

module.exports = Task;
