const mongoose = require("mongoose");
const { Schema } = mongoose;

const tasksSchema = new Schema(
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
      required: true
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

// Formats the due date (due field) and names the formatted date field "dueDate"
tasksSchema.virtual("dueDate").get(function () {
  return this.dateDue.toLocaleDateString();
});

// Removes the due field and replaces it with the dueDate virtual field.
tasksSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.dateDue;
    ret.dueDate = doc.dueDate;
    return ret;
  },
});

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
