const express = require('express');
const router = express.Router();
const { displayHome } = require('../controllers/home');

router.get('/', displayHome);

module.exports = router;
