require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const dbConnection = require("./config/db-connection.js");
const cookieParser = require("cookie-parser");
const indexRoutes = require("./routes/indexRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", indexRoutes);

app.get("/", (req, res) => {
  res.send("Working...");
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
