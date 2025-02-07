require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const port = process.env.PORT || 4000;
const url = process.env.MONGO_URI;

const start = () => {
  try {
    app.listen(port, async () => {
      await connectDB(url);
      console.log(`Runing server PORT: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
