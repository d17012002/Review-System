const db = require('../mongoDB');

const displayMain = (req, res) => {
  db.Namelist.find(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      res.render('main', { key: names });
    }
  });
};

const FFCSreview = (req, res) => {
  const Faculty = req.body.fname;
  const Reason = req.body.reason;

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

  if (req.body.button2 === 'blacklist') {
    res.redirect('/faculty');
  }
};

module.exports = {
  displayMain,
  FFCSreview,
};
