const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: './public/profilepics/',
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          '_' +
          Date.now() +
          path.extname(file.originalname) +
          '.png'
      )
    }
  })
  
  const upload = multer({
    storage: storage
  }).single('myImage')

  module.exports = upload;