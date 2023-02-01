//pw 7UEIk6Cb7iwvajDH
//mongodb+srv://ap:<password>@cluster0.5zxxui0.mongodb.net/?retryWrites=true&w=majority

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

const app = express();

//mongooseAtlas DB server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Successfully connected to mongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB");
    console.error(error);
  });

app.use(express.json());

//CORS error handling
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

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
