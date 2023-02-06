const db = require('../mongoDB');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const JWT_SECRET = 'some super secret...';

const displayForgetPass = (req, res) => {
  res.render('forget-password');
};

const generateResetLink = (req, res) => {
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
};

module.exports = {
  generateResetLink,
  displayForgetPass,
};
