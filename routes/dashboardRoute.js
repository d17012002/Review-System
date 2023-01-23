const db = require('../mongoDB');

const displayDashboard = (req, res) => {
  db.Query.find(function (err, query) {
    if (err) {
      console.log(err);
    } else {
      res.render('dashboard', { key: query });
    }
  });
};

const dashboardQueries = (req, res) => {
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
};

module.exports = {
  displayDashboard,
  dashboardQueries,
};
