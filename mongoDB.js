const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://webconnect:webconnect123@cluster0.tnchb.mongodb.net/firefoxDB'
);

const firefoxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is compulsory'],
  },
  email: {
    type: String,
    required: [true, 'email is compulsory'],
  },
  password: {
    type: String,
    required: [true, 'password is compulsory'],
  },
});

const FirefoxUser = mongoose.model('FirefoxUser', firefoxSchema);

const facultyInfoSchema = new mongoose.Schema({
  empID: {
    type: Number,
    required: [true, 'employee ID is required'],
  },
  name: String,
  mob: Number,
  email_ID: String,
});

const FacultyInfo = mongoose.model('FacultyInfo', facultyInfoSchema);

const querySchema = new mongoose.Schema({
  name: String,
  query: {
    type: String,
    required: [true, 'query is required'],
  },
  replies: [String],
});

const Query = mongoose.model('Query', querySchema);

const blacklistSchema = new mongoose.Schema({
  faculty: {
    type: String,
    required: [true, 'name is compulsory'],
  },
  reason: [String],
});

const Blacklist = mongoose.model('Blacklist', blacklistSchema);

const nameListSchema = new mongoose.Schema({
  name: String,
  empID: Number,
});

const Namelist = mongoose.model('Namelist', nameListSchema);

const ubFeedbackSchema = new mongoose.Schema({
  feedback: String,
});

const ubFeedback = mongoose.model('ubFeedback', ubFeedbackSchema);

module.exports.Anurag = new FirefoxUser({
  name: 'Anurag Singh',
  email: 'anuragkumar2020@vitbhopal.ac.in',
  password: 'anurag123',
});

const gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const galleryImage = mongoose.model('galleryImage', gallerySchema);

module.exports.Query = Query;
module.exports.FirefoxUser = FirefoxUser;
module.exports.Blacklist = Blacklist;
module.exports.Namelist = Namelist;
module.exports.FacultyInfo = FacultyInfo;
module.exports.ubFeedback = ubFeedback;
module.exports.galleryImage = galleryImage;
