const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: String, required: true },
  status: {
    type: String,
    enum: ["completed", "not completed"],
    default: "not completed",
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  image: { type: String, required: true },
  userID: String,
});

const TaskModel = mongoose.model("Task", taskSchema);
module.exports = {
  TaskModel,
};
