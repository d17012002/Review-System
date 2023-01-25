const db = require('../mongoDB');
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const displaySignin = (req, res) => {
  res.render('signin');
};

const userAuthentication = (req, res) => {
  Email = req.body.ename;
  Pass = req.body.psw;

  db.FirefoxUser.find({ email: Email }, function (err, firefoxusers) {
    if (err) {
      console.log(err);
    }
    if (!firefoxusers.length) {
      res.redirect('/error');
    } else {
      firefoxusers.forEach(function (firefoxuser) {
        if (Pass == firefoxuser.password) {
          res
            .cookie('user_id', firefoxuser.id, {
              expires: new Date(Date.now() + 864000000),
              httpOnly: true,
            })
            .redirect(`/dashboard/` + firefoxuser.id);
        } else {
          res.redirect('/error');
        }
      });
    }
  });
};

module.exports = {
  displaySignin,
  userAuthentication,
};
