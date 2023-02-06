const express = require('express');
const router = express.Router();
const { displayGallery, uploadImg } = require('../controllers/gallery');

router.get('/gallery', displayGallery);
router.post('/gallery', uploadImg);

module.exports = router;
