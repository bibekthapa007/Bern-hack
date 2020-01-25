var router = require("express").Router();
const { User } = require("../sequelize");
const jwt = require("jsonwebtoken");
var secret = Buffer.from("12345", "base64");

router.post("/register", (req, res) => {
  let { email } = req.body;
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      var token = jwt.sign(req.body, secret);

      User.findOne({
        where: {
          email: email
        }
      })
        .then(function(user) {
          if (!user) {
            console.log("Incorrect Email");
            res.send({
              message: "Email Not found"
            });
          } else {
            var token = jwt.sign(req.body, secret);

            console.log(token);
            res.send({
              message: "Sucessfull",
              user,
              jwt: token
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      User.create(req.body)
        .then(user => {
          req.user = user;
          // res.send({
          //   message:"Sucessfull",
          //   user
          // })
          var token = jwt.sign(req.body, secret);

          console.log(token);
          res.send({
            message: "Sucessfull",
            user,
            jwt: token
          });
        })
        .catch(err => {
          console.log(err);
          res.send({
            message: err,
            error: true,
            user: false
          });
        });
    }
  });
});

router.post("/login", function(req, res, next) {
  console.log(req.body);
  const { email, password } = req.body;
  User.findOne({
    where: {
      email: email
    }
  })
    .then(function(user) {
      if (!user) {
        console.log("Incorrect Email");
        res.send({
          message: "Email Not found"
        });
      } else if (!user.validPassword(password)) {
        console.log("Password wrong");
        res.send({ message: "Password wrong" });
      } else {
        var token = jwt.sign(req.body, secret);

        console.log(token);
        res.send({
          message: "Sucessfull",
          user,
          jwt: token
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  let token = req.header("x-auth-header");
  if (token) {
    token = token.toString();
  }
  var user = jwt.verify(token, secret);
  console.log(user);
  if (user) {
    res.send({ user });
  }
});

module.exports = router;
