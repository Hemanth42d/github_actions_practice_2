const mongoose = require("mongoose");

module.exports = mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb://admin:password@localhost:27017/taskManager?authSource=admin",
  )
  .then(() => {
    console.log("Db is connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
