//pw 7UEIk6Cb7iwvajDH
//mongodb+srv://ap:<password>@cluster0.5zxxui0.mongodb.net/?retryWrites=true&w=majority

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const saucerRoutes = require("./routes/stuff");

const app = express();

mongoose
  .connect(
    "mongodb+srv://ap:7UEIk6Cb7iwvajDH@cluster0.5zxxui0.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to mongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB");
    console.error(error);
  });

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

//TODO create route for signing up

module.exports = app;
