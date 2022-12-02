const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require(__dirname + '/mongoDB.js');
const auth = require(__dirname + '/public/javaScript/checkValidation');

const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
const { query } = require('express');

var Email = auth.Email;
var Pass = auth.Pass;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
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
});

app.get('/signin', function (req, res) {
  res.render('signin');
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.get('/error', function (req, res) {
  res.render('error');
});

app.get('/ub', function (req, res) {
  db.ubFeedback.find(function (err, feed) {
    if (err) {
      console.log(err);
    } else {
      res.render('underbelly', { key: feed });
    }
  });
});

app.get('/dashboard/:id', (req, res) => {
  db.Query.find(function (err, query) {
    if (err) {
      console.log(err);
    } else {
      res.render('dashboard', { key: query });
    }
  });
});

app.post('/dashboard/:id', (req, res) => {
  const userID = req.params.id;
  if (req.body.submit_btn === 'QuerySubmission') {
    console.log('User id: ', userID);
    const Query = req.body.newQuery;
    db.FirefoxUser.findById(userID, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        console.log('name: ', foundUser);
        const newQuery = new db.Query({
          name: foundUser.name,
          query: Query,
        });
        console.log(' saving this: ', newQuery);
        newQuery.save();
        res.redirect(`/dashboard/` + userID);
      }
    });
  } else {
    const Reply = req.body.reply;
    const Question = req.body.submit_reply;

    db.Query.updateOne(
      { query: Question },
      {
        $push: { replies: Reply },
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('New reply added in the query.');
        }
      }
    );
    res.redirect(`/dashboard/` + userID);
  }
});

app.get('/facultyDetails', (req, res) => {
  db.FacultyInfo.find(function (err, Info) {
    if (err) {
      console.log(err);
    } else {
      res.render('facultyDetails', { details: Info });
    }
  });
});

app.get('/faculty', function (req, res) {
  //check user validity first
  if (Email == '' || Pass == '') {
    res.redirect('/');
  }

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
});

app.get('/forget-password', (req, res) => {
  res.render('forget-password');
});

const JWT_SECRET = 'some super secret...';

app.post('/forget-password', (req, res) => {
  const { Email } = req.body;
  db.FirefoxUser.find({ email: Email }, function (err, users) {
    if (err) {
      console.log(err);
    }
    if (!users.length) {
      res.send('This user is not registered.');
      return;
    } else {
      users.forEach(function (user) {
        if (user.email === Email) {
          res.send(
            'Yes this user exists: ' +
              Email +
              '<br>Password reset link has been sent to your email ID</br>'
          );

          const secret = JWT_SECRET + user.password;

          const payload = {
            email: user.email,
            id: user.id,
          };

          const token = jwt.sign(payload, secret, { expiresIn: '5m' });

          //send email  - code here

          const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
          console.log('Reset link for localhost: ', link);

          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'the4musketeeers@gmail.com',
              pass: 'jyestailmwokdibd',
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          let mailOptions = {
            from: 'the4musketeeers@gmail.com',
            to: Email,
            subject: 'Password Reset Link - Review System',
            text: `Do not share this link with anyone. Link will be active for 5 mins only. 
            
            https://vitb-review-system.onrender.com/reset-password/${user.id}/${token} 
            
            Regards Anurag`,
          };

          transporter.sendMail(mailOptions, function (err, success) {
            if (err) {
              console.log(err);
            } else {
              console.log('Email sent successfully');
            }
          });
        }
      });
    }
  });
});

app.get('/reset-password/:id/:token', (req, res, next) => {
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
});

app.post('/reset-password/:id/:token', (req, res, next) => {
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
});

app.post('/signin', function (req, res) {
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
});

app.post('/signup', function (req, res) {
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
});

app.post('/main', function (req, res) {
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
});

app.get('/4m/:id', function (req, res) {
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
});

app.get('/main', function (req, res) {
  db.Namelist.find(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      res.render('main', { key: names });
    }
  });
});

app.post('/ub', function (req, res) {
  const feed = req.body.newFeedback;
  const newFeedback = new db.ubFeedback({
    feedback: feed,
  });
  newFeedback.save();
  res.redirect('/ub');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server running at 🚀 : http://localhost:3000/');
});
