const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const LinkModel = require("./models/link");
const DataModel = require("./models/data");

const sequelize = new Sequelize("hack", "root", "thapa", {
  dialect: "mysql",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: false
  }
});

const User = UserModel(sequelize, Sequelize);
const Link = LinkModel(sequelize, Sequelize);
const Data = DataModel(sequelize, Sequelize);

// Link.hasMany(Data, {
//   foreignKey: "linkId",
//   sourceKey: "id"
// });

// sequelize.sync({ force: true }).then(() => {
//   console.log(`Database & tables created here!`);
// });
module.exports = {
  sequelize,
  User,
  Link,
  Data
};
