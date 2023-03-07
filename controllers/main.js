var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const sdk = require('api')('@eden-ai/v2.0#cyr6o4ld8rjs4k');
const db = require('../mongoDB');
sdk.auth(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTAwYTExZmYtNDE0NS00YzRhLWJhM2ItNTlhNzZmYjBmYmE3IiwidHlwZSI6ImFwaV90b2tlbiJ9.4aVI7VKnsnnl2KwpWE3zg7qb1aaSfFATsjDk_05hpxU'
);

const displayMain = (req, res) => {
  db.Namelist.find(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      res.render('main', { key: names });
    }
  });
};

const FFCSreview = async (req, res) => {
  if (req.body.back_btn === 'back') {
    var header = req.headers.cookie;
    var token = header.split('=');
    res.redirect('/dashboard/' + token[1]);
  }
  const Faculty = req.body.fname;
  const Reason = req.body.reason;

  //sentiment ananlysis
  await sdk
    .text_sentiment_analysis_create({
      response_as_dict: true,
      attributes_as_list: false,
      show_original_response: false,
      language: 'en',
      text: Reason,
      providers: 'amazon',
    })
    .then(({ data }) => {
      const sentiment = data.amazon.general_sentiment;
      const rate = data.amazon.general_sentiment_rate;

      if (data.amazon.status === 'error') {
        res.redirect('/abort');
      }

      if (sentiment === 'Negative' && rate > 0.1) {
        res.redirect('/abort');
      } else {
        if (req.body.button1 === 'addToList') {
          if (Faculty === 'Select one faculty...') {
            res.redirect('/main');
          } else {
            db.Blacklist.find({ faculty: Faculty }, function (err, lists) {
              if (!lists.length) {
                const newBlacklist = new db.Blacklist({
                  faculty: Faculty,
                  reason: [Reason],
                });
                newBlacklist.save();
                res.redirect('/main');
                console.log('New faculty added in the list.');
              } else {
                db.Blacklist.updateOne(
                  { faculty: Faculty },
                  {
                    $push: { reason: Reason },
                  },
                  function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('New review added in existing faculty.');
                    }
                  }
                );
                res.redirect('/main');
              }
            });
          }
        }
      }
    })
    .catch((err) => console.error(err));

  if (req.body.button2 === 'blacklist') {
    res.redirect('/faculty');
  }
};

module.exports = {
  displayMain,
  FFCSreview,
};
