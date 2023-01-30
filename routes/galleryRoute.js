const multer = require('multer');
const db = require('../mongoDB');
//testImage  = img
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single('img');

const displayGallery = (req, res) => {
  res.render('gallery');
};

const uploadImg = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new db.galleryImage({
        name: req.body.name,
        image: {
          data: req.body.filename,
          contentType: 'image/png',
        },
      });
      newImage
        .save()
        .then(() => res.redirect('/gallery'))
        .catch((err) => console.log(err));
    }
  });
};

module.exports = {
  displayGallery,
  uploadImg,
};
