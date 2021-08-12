const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getFileStream } = require('../s3');
const { default: axios } = require('axios');


router.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log(file);

  try {
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    //what comes back from s3 bucket
    console.log('bucket response', result.Location);
    res.send({ imagePath: result.Location });
  } catch (error) {
    console.log('Having issues sending to s3', error);
  }
});

module.exports = router;
