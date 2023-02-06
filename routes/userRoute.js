const express = require('express');
const router = express.Router();
const { users } = require('../controllers/user');

router.get('/4m/:id', users);

module.exports = router;
