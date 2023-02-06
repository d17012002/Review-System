var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());
const db = require('../mongoDB');

const displayUb = (req, res) => {
  db.ubFeedback.find(function (err, feed) {
    if (err) {
      console.log(err);
    } else {
      res.render('underbelly', { key: feed });
    }
  });
};

const ubFeedback = (req, res) => {
  if (req.body.back_btn === 'back') {
    var header = req.headers.cookie;
    var token = header.split('=');
    res.redirect('/dashboard/' + token[1]);
  } else {
    const feed = req.body.newFeedback;
    const newFeedback = new db.ubFeedback({
      feedback: feed,
    });
    newFeedback.save();
    res.redirect('/ub');
  }
};

module.exports = {
  displayUb,
  ubFeedback,
};
