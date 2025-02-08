require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const authRouter = require("./routes/authRouter");

const port = process.env.PORT || 4000;
const url = process.env.MONGO_URI;



//security
app.use(helmet());
app.use(cors());
app.use(helmet());
// app.use(compression());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/auth",authRouter)

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
