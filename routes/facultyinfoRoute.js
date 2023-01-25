var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());
const db = require('../mongoDB');

const displayFacultyInfo = (req, res) => {
  db.FacultyInfo.find(function (err, Info) {
    if (err) {
      console.log(err);
    } else {
      res.render('facultyDetails', { details: Info });
    }
  });
};

const backBtn = (req, res) => {
  if (req.body.back_btn === 'back') {
    var header = req.headers.cookie;
    var token = header.split('=');
    res.redirect('/dashboard/' + token[1]);
  }
};

module.exports = { displayFacultyInfo, backBtn };
