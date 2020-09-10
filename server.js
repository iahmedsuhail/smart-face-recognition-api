const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
var cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "jhon",
      email: "jhon@gmail.com",
      password: "jhon",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  console.log("Tryna connect to home route");
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  console.log("tryna hit signin route");
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else res.json("fail");
});

app.post("/register", (req, res) => {
  console.log("tryna hit register route");
  const { email, name, password } = req.body;

  database.users.push({
    id: "123",
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(404);
    res.json("User not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(404);
    res.json("User not found");
  }
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
