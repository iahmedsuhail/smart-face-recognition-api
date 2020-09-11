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
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  console.log("tryna hit signin route");
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else res.json("fail");
});

app.post("/register", (req, res) => {
  console.log("tryna hit register route");
  const { email, name, password } = req.body;

  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0],
            entries: 0,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("Unable to register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status("400").json("Something went wrong");
      }
    })
    .catch((err) => res.status("400").json("Something went wrong"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status("400").json("Unable to get entries"));
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
