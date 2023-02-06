const express = require('express');
const router = express.Router();
const { displayFacultyInfo, backBtn } = require('../controllers/facultyinfo');

router.get('/facultyDetails', displayFacultyInfo);
router.post('/facultyDetails', backBtn);

module.exports = router;
