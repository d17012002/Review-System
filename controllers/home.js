const db = require('../mongoDB');

const displayHome = (req, res) => {
  db.FirefoxUser.find(function (err, firefoxusers) {
    if (firefoxusers.length === 0) {
      db.Anurag.save();
      console.log('Default users added');
    }
    if (err) {
      console.log(err);
    } else {
      res.render('home');
    }
  });
};

module.exports = {
  displayHome,
};
