const express = require('express');
const router = express.Router();
const { displayReset, resetPass } = require('../controllers/resetPass');

router.get('/reset-password/:id/:token', displayReset);
router.post('/reset-password/:id/:token', resetPass);

module.exports = router;
