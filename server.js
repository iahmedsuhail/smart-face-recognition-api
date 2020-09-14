const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
var cors = require("cors");
const morgan = require("morgan");

const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

var db = require("knex")({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

app.get("/", (req, res) => {
  res.json("Server up and running");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.post("/profile/:id", (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
