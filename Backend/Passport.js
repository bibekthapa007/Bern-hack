var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const { User } = require("./sequelize");

const JWTStrategy = passportJWT.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, cb) {
      //Assume there is a DB module pproviding a global UserModel
      return User.findOne({ email, password })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }

          return cb(null, user, {
            message: "Logged In Successfully"
          });
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed
      return User.findOneById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

module.exports = passport;
