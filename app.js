const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('public'));

const { displayHome } = require('./routes/homeRoute');

const { displaySignin, userAuthentication } = require('./routes/signinRoute');

const { displaySignup, createAccount } = require('./routes/signupRoute');

const { displayError } = require('./routes/errorRoute');

const { displayUb, ubFeedback } = require('./routes/ubRoute');

const { facultyReview } = require('./routes/facultyRoute');

const { users } = require('./routes/userRoute');

const { displayMain, FFCSreview } = require('./routes/mainRoute');

const { displayFacultyInfo } = require('./routes/facultyinfoRoute');
const { displayAbort } = require('./routes/abortRoute');
const {
  displayDashboard,
  dashboardQueries,
} = require('./routes/dashboardRoute');

const {
  displayForgetPass,
  generateResetLink,
} = require('./routes/forgetPassRoute');

const { displayReset, resetPass } = require('./routes/resetPassRoute');
const { back } = require('./routes/facultyRoute');
const { backBtn } = require('./routes/facultyinfoRoute');

//GET requests
app.get('/ub', displayUb);
app.get('/4m/:id', users);
app.get('/', displayHome);
app.get('/abort', displayAbort);
app.get('/main', displayMain);
app.get('/error', displayError);
app.get('/signin', displaySignin);
app.get('/signup', displaySignup);
app.get('/faculty', facultyReview);
app.get('/dashboard/:id', displayDashboard);
app.get('/forget-password', displayForgetPass);
app.get('/facultyDetails', displayFacultyInfo);
app.get('/reset-password/:id/:token', displayReset);

//POST requests
app.post('/ub', ubFeedback);
app.post('/main', FFCSreview);
app.post('/faculty', back);
app.post('/facultyDetails', backBtn);
app.post('/signup', createAccount);
app.post('/signin', userAuthentication);
app.post('/dashboard/:id', dashboardQueries);
app.post('/forget-password', generateResetLink);
app.post('/reset-password/:id/:token', resetPass);

app.listen(process.env.PORT || 3000, function () {
  console.log('Server running at 🚀 : http://localhost:3000/');
});
