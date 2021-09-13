const express = require("express");
const config = require("config");
const cors = require("cors");

const mysql = require("mysql2");

const PORT = process.env.PORT | config.get("serverPort");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/transportation", require("./routes/transportation.routes"));

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
