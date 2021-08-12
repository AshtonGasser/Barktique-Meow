require('dotenv').config();

const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const ACL = 'public-read';
const ContentType = 'image/png' || 'image/jpg' || 'image/jpeg' || 'image/svg';
const s3 = new S3({
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
});

//Uploads a file to s3

//Passing in file location and name that came from multer
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ACL,
    ContentType,
  };

  return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

//Downloads a file from s3
