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
  const feed = req.body.newFeedback;
  const newFeedback = new db.ubFeedback({
    feedback: feed,
  });
  newFeedback.save();
  res.redirect('/ub');
};

module.exports = {
  displayUb,
  ubFeedback,
};
