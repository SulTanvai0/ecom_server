const express = require("express");
const path = require("path");
const router = require("./src/routes/api");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "config.env" });

//Security Lib Imports
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
//Database Lib Import
const mongoose = require("mongoose");
//app
const app = express();

//Security middleware implementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Middleware to parse JSON in the request body
app.use(express.json());

//Request rate Limit
const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 2000 });
app.use(limiter);

//Database connection
mongoose
  .connect(process.env.MONGO_URI )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Routing implementation
app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "[ * Route not found * ]",
  });
});

module.exports = app;
