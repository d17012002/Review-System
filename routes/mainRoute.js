const express = require('express');
const router = express.Router();
const { displayMain, FFCSreview } = require('../controllers/main');

router.get('/main', displayMain);
router.post('/main', FFCSreview);

module.exports = router;
