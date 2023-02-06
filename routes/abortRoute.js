const express = require('express');
const router = express.Router();
const { displayAbort } = require('../controllers/abort');

router.get('/abort', displayAbort);

module.exports = router;
