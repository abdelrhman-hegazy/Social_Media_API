require("dotenv").config()
const express = require("express");
const app = express();

const port = process.env.PORT||4000;

app.get("/", (req, res) => {
  res.send("Welcome...");
});


app.listen(port, () => {
  console.log(`Runing server PORT: ${port}`);
});
