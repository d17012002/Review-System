const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const ubRoute = require('./routes/ubRoute');
const mainRoute = require('./routes/mainRoute');
const homeRoute = require('./routes/homeRoute');
const userRoute = require('./routes/userRoute');
const errorRoute = require('./routes/errorRoute');
const abortRoute = require('./routes/abortRoute');
const signupRoute = require('./routes/signupRoute');
const signinRoute = require('./routes/signinRoute');
const facultyRoute = require('./routes/facultyRoute');
const galleryRoute = require('./routes/galleryRoute');
const resetPassRoute = require('./routes/resetPassRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const forgetPassRoute = require('./routes/forgetPassRoute');
const facultyInfoRoute = require('./routes/facultyInfoRoute');

app.use('/', ubRoute);
app.use('/', homeRoute);
app.use('/', userRoute);
app.use('/', dashboardRoute);
app.use('/', resetPassRoute);
app.use('/', facultyInfoRoute);
app.use('/', forgetPassRoute);
app.use('/', signinRoute);
app.use('/', signupRoute);
app.use('/', facultyRoute);
app.use('/', mainRoute);
app.use('/', galleryRoute);
app.use('/', errorRoute);
app.use('/', abortRoute);

app.listen(process.env.PORT || 3000, function () {
  console.log('Server running at 🚀 : http://localhost:3000/');
});
