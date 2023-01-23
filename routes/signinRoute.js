const db = require('../mongoDB');

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
          res.redirect(`/dashboard/` + firefoxuser.id);
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
