const express = require('express');
const router = express.Router();
const {
  displayForgetPass,
  generateResetLink,
} = require('../controllers/forgetPass');

router.get('/forget-password', displayForgetPass);
router.post('/forget-password', generateResetLink);

module.exports = router;
