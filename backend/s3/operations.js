const {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const { s3, s3_bucket_name, s3_region_name } = require("./aws");

exports.uploadImageToS3 = async (bucketFolder, data) => {
  const bytes = Buffer.from(data, "base64");
  const uid = uuidv4();
  const key = bucketFolder + "/" + uid + ".jpg";

  const input = {
    ACL: "public-read-write",
    Bucket: s3_bucket_name,
    Key: key,
    Body: bytes,
  };
  const command = new PutObjectCommand(input);
  await s3.send(command);
  return key;
};

exports.getS3Images = async (offset) => {
  const input = {
    Bucket: s3_bucket_name,
    MaxKeys: 6,
    StartAfter: offset || undefined,
  };
  const command = new ListObjectsV2Command(input);
  const response = await s3.send(command);
  return response;
};

exports.getS3ImagesByUser = async (bucketFolder) => {
  const input = {
    Bucket: s3_bucket_name,
    Prefix: bucketFolder,
  };
  const command = new ListObjectsV2Command(input);
  const response = await s3.send(command);
  return response;
};

exports.getS3ImageByKey = async (key) => {
  const input = {
    Bucket: s3_bucket_name,
    Key: key,
  };
  const command = new GetObjectCommand(input);
  const response = await s3.send(command);
  return response;
};

exports.deleteS3ImageByKey = async (key) => {
  const input = {
    Bucket: s3_bucket_name,
    Key: "57998938-43a9-493c-a487-c46b42f94a87/2211dd3e-2b8a-4bb4-80b7-9862a41a290a.jpg",
  };
  const command = new DeleteObjectCommand(input);
  await s3.send(command);
};
