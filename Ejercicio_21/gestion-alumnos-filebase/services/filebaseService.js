const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const s3 = require('../config/s3');

const bucketName = process.env.AWS_BUCKET_NAME;

function getExtension(originalName) {
  return path.extname(originalName || '').toLowerCase() || '.jpg';
}

async function uploadImage(file) {
  if (!file) return null;

  if (!bucketName) {
    throw new Error('Falta AWS_BUCKET_NAME en .env');
  }

  const fileName = `${uuidv4()}${getExtension(file.originalname)}`;

  await s3.send(new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype
  }));

  return fileName;
}

async function deleteImage(fileName) {
  if (!fileName || !bucketName) return;

  await s3.send(new DeleteObjectCommand({
    Bucket: bucketName,
    Key: fileName
  }));
}

function getPublicImageUrl(fileName) {
  if (!fileName) return '/img/placeholder.svg';
  return `${process.env.AWS_ENDPOINT || 'https://s3.filebase.com'}/${bucketName}/${fileName}`;
}

module.exports = { uploadImage, deleteImage, getPublicImageUrl };
