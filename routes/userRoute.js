const db = require('../mongoDB');

const users = (req, res) => {
  const owners = req.params.id;
  db.FirefoxUser.find(function (err, firefoxusers) {
    if (err) {
      console.log(err);
    } else {
      let userCount = 0;
      for (var i = 0; i < firefoxusers.length; i++) {
        userCount++;
      }
      res.render(owners, { key: firefoxusers, num: userCount });
    }
  });
};

module.exports = {
  users,
};
