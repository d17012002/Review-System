const db = require('../mongoDB');

const displayFacultyInfo = (req, res) => {
  db.FacultyInfo.find(function (err, Info) {
    if (err) {
      console.log(err);
    } else {
      res.render('facultyDetails', { details: Info });
    }
  });
};

module.exports = { displayFacultyInfo };
