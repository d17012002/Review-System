const express = require('express');
const router = express.Router();
const { displaySignin, userAuthentication } = require('../controllers/signin');

router.get('/signin', displaySignin);
router.post('/signin', userAuthentication);

module.exports = router;
