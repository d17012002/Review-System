const express = require('express');
const router = express.Router();
const { displaySignup, createAccount } = require('../controllers/signup');

router.get('/signup', displaySignup);
router.post('/signup', createAccount);

module.exports = router;
