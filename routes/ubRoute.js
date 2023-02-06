const express = require('express');
const router = express.Router();
const { displayUb, ubFeedback } = require('../controllers/ub');

router.get('/ub', displayUb);
router.post('/ub', ubFeedback);

module.exports = router;
