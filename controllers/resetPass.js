const db = require('../mongoDB');
const jwt = require('jsonwebtoken');

const displayReset = (req, res, next) => {
  const { id, token } = req.params;

  //check if this ID present in database
  db.FirefoxUser.find({ id: id }, function (err, users) {
    if (err) {
      console.log(err);
    }
    if (!users.length) {
      res.send('User ID did not matched.');
    } else {
      users.forEach(function (user) {
        if (user.id === id) {
          const secret = JWT_SECRET + user.password;
          try {
            const payload = jwt.verify(token, secret);
            res.render('reset-password', { email: user.email });
          } catch (error) {
            console.log(error.message);
            res.send(error.message);
          }
        }
      });
    }
  });
};

const resetPass = (req, res, next) => {
  const { id, token } = req.params;
  const { password, password2 } = req.body;

  let p1 = password;
  let p2 = password2;

  if (p1 === p2) {
    //check if this ID present in database
    db.FirefoxUser.updateOne({ _id: id }, { password: p2 }, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/signin');
      }
    });
  } else {
    res.send('Error');
  }
};

module.exports = {
  displayReset,
  resetPass,
};
