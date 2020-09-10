const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

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
  res.send("Server is working");
});

app.post("/signin", (req, res) => {
  console.log(req.body);
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else res.json("fail");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "123",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
