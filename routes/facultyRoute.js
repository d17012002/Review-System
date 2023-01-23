const db = require('../mongoDB');

const facultyReview = (req, res) => {
  db.Blacklist.find(function (err, list) {
    if (err) {
      console.log(err);
    } else {
      let facultyCount = 0;
      for (var i = 0; i < list.length; i++) {
        facultyCount++;
      }
      res.render('faculty', { key: list, num: facultyCount });
    }
  });
};

module.exports = { facultyReview };
