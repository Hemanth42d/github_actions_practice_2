const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("task", taskSchema);
