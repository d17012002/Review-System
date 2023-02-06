const multer = require('multer');
const path = require('path');
const db = require('../mongoDB');

var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: Storage,
}).single('image');

const displayGallery = (req, res) => {
  db.galleryImage.find(function (err, images) {
    if (err) {
      console.log(err);
    } else {
      res.render('gallery', { key: images });
    }
  });
};

const uploadImg = (req, res) => {
  if (req.body.back_btn === 'back') {
    var header = req.headers.cookie;
    var token = header.split('=');
    res.redirect('/dashboard/' + token[1]);
  } else {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        const newImage = new db.galleryImage({
          name: req.body.name,
          image: {
            data: '/uploads/' + req.file.filename,
            contentType: 'image/png',
          },
        });
        console.log(newImage);
        newImage
          .save()
          .then(() => res.redirect('/gallery'))
          .catch((err) => console.log(err));
      }
    });
  }
};

module.exports = {
  displayGallery,
  uploadImg,
};
