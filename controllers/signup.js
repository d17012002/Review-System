const db = require('../mongoDB');

const displaySignup = (req, res) => {
  res.render('signup');
};

const createAccount = (req, res) => {
  var NAME = req.body.name;
  var EMAIL = req.body.email;
  var PASSWORD = req.body.psw;

  var exists = '0';

  db.FirefoxUser.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      users.forEach(function (user) {
        if (user.email === EMAIL) {
          console.log('This user already exists.');
          exists = '1';
          return;
        }
      });
    }
    if (exists === '0') {
      const newFirefoxUser = new db.FirefoxUser({
        name: NAME,
        email: EMAIL,
        password: PASSWORD,
      });
      console.log('Value of exists: ', exists);
      newFirefoxUser.save();
      res.redirect('/signin');
    } else {
      res.redirect('/error');
    }
  });
};

module.exports = {
  displaySignup,
  createAccount,
};
