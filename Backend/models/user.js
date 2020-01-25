/* jshint indent: 2 */
var sha256 = require("sha256");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
        validate: {
          isEmail: {
            msg: "Must be a valid email address"
          }
        }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );

  User.prototype.validPassword = function(password) {
    var hashedPassword = sha256.x2(password);
    return hashedPassword === this.password;
  };

  User.beforeCreate(user => {
    if (user.password) {
      user.password = sha256.x2(user.password);
    }
  });

  return User;
};

// sudo sequelize-auto -o "./models" -d todo -h localhost -u root -p 3306 -x thapa -e mysql -t todo
