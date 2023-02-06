const express = require('express');
const router = express.Router();
const { displayError } = require('../controllers/error');

router.get('/error', displayError);

module.exports = router;
