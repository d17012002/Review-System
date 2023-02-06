const express = require('express');
const router = express.Router();
const { facultyReview, back } = require('../controllers/faculty');

router.get('/faculty', facultyReview);
router.post('/faculty', back);

module.exports = router;
