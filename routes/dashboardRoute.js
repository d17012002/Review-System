const express = require('express');
const router = express.Router();
const {
  displayDashboard,
  dashboardQueries,
} = require('../controllers/dashboard');

router.get('/dashboard/:id', displayDashboard);
router.post('/dashboard/:id', dashboardQueries);

module.exports = router;
