const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
var cors = require("cors");
const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());

var db = require("knex")({
  client: "pg",
  version: "8.3",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "password",
    database: "smart-brain",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    // console.log(data);
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  console.log("Tryna connect to home route");
  // res.send(database.users);
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

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
