var { User } = require("../sequelize");

const handlePassportUser = (req, res, next) => {
  const { email, password } = req.passportUser;
  User.findOne({
    where: {
      email: email
    }
  })
    .then(function(user) {
      if (!user) {
        console.log("Incorrect Email");
        return res.send({
          message: "Email Not Found",
          error: true
        });
      } else if (!user.validPassword(password)) {
        console.log("Password wrong");
        return res.send({
          message: "Incorrect password.",
          error: true
        });
      }
      req.login(user, err => {
        res.send({ message: "Sucessfull", user });
        return;
      });
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
};

module.exports = handlePassportUser;
