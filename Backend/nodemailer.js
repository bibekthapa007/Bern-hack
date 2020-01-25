const nodemailer = require("nodemailer");

function nodeMailer(req, res, next) {
  var mailOptions, link;
  var hash = req.token.hash;
  let {moduleId} = req;
  // var host = req.get("host");
  var host = "localhost:3000"
//   var clientHost = process.env.CLIENT_URL;
  link = "http://" + host + "/" + moduleId  +"/verify?token=" + hash;
  console.log(link);
  mailOptions = {
    from: "Bibek <bibekthapa922@gmail.com>",
    to: req.body.email,
    subject: "Helo Please confirm your Email account",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>"
  };
  // console.log(mailOptions);
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "bibekthapa922@gmail.com",
      clientId:
        "39576393321-0narurspctc94js9ncivk8cbhs2hednv.apps.googleusercontent.com",
      clientSecret: "s4awPpRbt1stFGFr-badBAEK",
      refreshToken: "1//04XFDkmoXcwSCCgYIARAAGAQSNgF-L9Irx2Gw-5GMdW2rYKTctiJ-WgiTexz-Lxpgn6TPfC9a0YUObS5sleJnn39hbsCwFJ5Igg"
    }
  });
  transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.status(201).send({
        errors:  {
          email: "Address not found"
        }
      });
    } else {
      transporter.close();
      res.status(200).send({
        message: "Check email to verify account.",
        user: req.user
      });
    }
  });
}

module.exports = {
  nodeMailer: nodeMailer
};