const express = require("express");
const bodyParser = require("body-parser");
const expressip = require("express-ip");
const app = express();
var useragent = require("express-useragent");
const cors = require("cors");
const authRoute = require("./routes/AuthRoute");
const jwt = require("jsonwebtoken");
var secret = Buffer.from("12345", "base64");
var crc32 = require("crc32");
var { Link, User, Data } = require("./sequelize");
const extIP = require("external-ip");
var UAParser = require("ua-parser-js");
var Cookies = require("cookies");
var crypto = require("crypto");
const Sequelize = require("sequelize");

app.use(useragent.express());

app.get("/hello", (req, res) => {
  res.send(req.useragent);
});

app.use(bodyParser.json());
app.use(expressip().getIpInfoMiddleware);

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(function(req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  var keys = ["keyboard cat"];

  var cookies = new Cookies(req, res, { keys: keys });
  var newId = crypto.randomBytes(20).toString("hex");

  // Get a cookie
  var lastVisit = cookies.get("connect-id", { signed: true });

  // Set the cookie to a value

  if (!lastVisit) {
    // req.cookieId = newId;
    cookies.set("connect-id", newId, { signed: true });
    res.setHeader("Content-Type", "text/plain");
  } else {
    console.log(lastVisit);
    req.cookieId = lastVisit;
    res.setHeader("Content-Type", "text/plain");
  }
  next();
});

const checkUser = async (req, res, next) => {
  let token = req.header("x-auth-token");
  console.log(token);
  token = token || req.body.token;

  if (token) {
    jwt.verify(token.toString(), secret, (err, user) => {
      if (!err) {
        if (!user) {
          return res.send({ message: "User not Found", error: true });
        } else {
          console.log(user);
          req.user = user;
        }
        next();
      } else {
        res.send({
          message: "Invalid Token signature Login Again",
          error: true
        });
      }
    });
  } else {
    res.send({ message: "Token Not Found" });
  }
};

app.use("/api/auth", authRoute);

app.post("/api/createlink", checkUser, (req, res) => {
  console.log(req.user, req.body.originalLink);
  User.findOne({ email: req.user.email }).then(dbUser => {
    console.log(req.user.email);
    if (dbUser) {
      console.log(dbUser);
      let originalLink = req.body.originalLink;
      let data = { userId: dbUser.id, originalLink };
      let hash = crc32(originalLink, true);
      data.hash = hash;
      Link.create(data).then(link => {
        // console.log(Link);
        res.send({ link });
      });
    } else {
      res.send({ message: "Email Not Found Register Again" });
    }
  });
});

app.get("/l/:hash", (req, res) => {
  let hash = req.params.hash;
  console.log(req.body, hash);
  var parser = new UAParser();
  var ua = req.headers["user-agent"];
  console.log(ua);
  Link.findOne({where:{ hash }}).then(link => {
    console.log(link.dataValues, "123 line l/hash");
    res.writeHead(302, { Location: link.dataValues.originalLink });
    res.end();

    var browserName = parser.setUA(ua).getBrowser().name;
    var fullBrowserVersion = parser.setUA(ua).getBrowser().version;
    var browserVersion = fullBrowserVersion.split(".", 1).toString();
    var browserVersionNumber = Number(browserVersion);
    console.log(browserVersionNumber, browserName);

    let getIP = extIP({
      replace: true,
      services: [
        "https://ipinfo.io/ip",
        "http://ifconfig.co/x-real-ip",
        "http://ifconfig.io/ip"
      ],
      timeout: 600,
      getIP: "parallel"
    });
    getIP((err, ip) => {
      let data = {
        ip,
        browserName,
        linkId: link.id,
        hash: link.hash,
        source: req.useragent.source,
        os: req.useragent.os,
        date: Date(),
        cookieId: req.cookieId
      };
      Data.create(data).then(data => {
        console.log(data.dataValues);
      });
    });
  });
});

app.get("/api/stat/links", checkUser, (req, res) => {
  User.findOne({ where: { email: req.user.email } }).then(dbUser => {
    console.log(req.user.email);
    if (dbUser) {
      console.log(dbUser.dataValues);
      Link.findAll({ where: { userId: dbUser.id } }).then(links => {
        console.log(links);
        res.send(links);
      });
    } else {
      res.send({ message: "Email Not Found Register Again" });
    }
  });
});

app.get("/api/stat/links/:linkId", checkUser, (req, res) => {
  console.log(req.params.linkId);
  User.findOne({ where: { email: req.user.email } }).then(dbUser => {
    console.log(req.user.email);
    if (dbUser) {
      Link.findOne({where:{ hash: req.params.linkId }}).then(links => {
        if (links) {
          Data.findAll({ where: { linkId: links.dataValues.id } }).then(data => {
            links.dataValues.data = data;
            res.send(links);
          });
        } else {
          res.send({ message: "Link Not Found" });
        }
      });
    } else {
      res.send({ message: "Email Not Found Register Again" });
    }
  });
});

app.get("/api/stat/dlinks/:linkId", checkUser, (req, res) => {
  console.log(req.params.linkId);
  User.findOne({where:{ email: req.user.email }}).then(dbUser => {
    console.log(req.user.email);
    if (dbUser) {
      Link.findOne({ where: { hash: req.params.linkId }, raw: true }).then(
        links => {
          Data.findAll({
            where: { linkId: req.params.linkId },
            raw: true,
            attributes: [
              [Sequelize.fn("DISTINCT", Sequelize.col("cookieId")), "cookieId"],
              "id",
              "ip",
              "source",
              "hash",
              "platform",
              "linkId",
              "os",
              "device",
              "browserName",
              "ent_date"
            ]
          }).then(data => {
            console.log(data, "New Data", links);
            // let uniqueData = [...new Set(data.map(x => x))];
            // links.data = uniqueData;
            // console.log(uniqueData)
            const result = [];
            const map = new Map();
            for (const item of data) {
              if (!map.has(item.cookieId)) {
                map.set(item.cookieId, true); // set any value to Map
                result.push(item);
              }
            }
            console.log(result);
            links.data = result;
            res.send(links);
          });
        }
      );
    } else {
      res.send({ message: "Email Not Found Register Again" });
    }
  });
});

app.get("/api/stat/time-chart/:linkId", checkUser, (req, res) => {
  console.log(req.params.linkId);
  User.findOne({ where: { email: req.user.email } }).then(dbUser => {
    console.log(req.user.email);
    if (dbUser) {
      Link.findOne({ id: req.params.linkId }).then(links => {
        Data.findAll({
          where: { linkId: req.params.linkId },
          attributes: ["ent_date"]
        }).then(data => {
          links.dataValues.data = data;
          res.send(links);
        });
      });
    } else {
      res.send({ message: "Email Not Found Register Again" });
    }
  });
});

const port = 5000;

app.listen(5000, "192.168.8.208" || "localhost", () => {
  console.log(`Running on http://localhost:${port}`);
});
