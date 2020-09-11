const handleSignin = (req, res, db, bcrypt) => {
  console.log("tryna hit signin route");
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      console.log("isValid from signin is", isValid);
      if (isValid) {
        db.select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status("400").json("Unable to get user"));
      } else {
        res.status(400).json("Wrong credentials");
      }
    })
    .catch((err) => res.status("400").json("Something went wrong"));
};

module.exports = {
  handleSignin: handleSignin,
};
