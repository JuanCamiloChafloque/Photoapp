const {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const { s3, s3_bucket_name, s3_region_name } = require("./aws");

exports.uploadImageToS3 = async (bucketFolder, data) => {
  const bytes = Buffer.from(data, "base64");
  const uid = uuidv4();
  const key = bucketFolder + "/" + uid + ".jpg";

  const input = {
    ACL: "public-read",
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

exports.getS3ImageByKey = async (key) => {
  const input = {
    Bucket: s3_bucket_name,
    Key: key,
  };
  const command = new GetObjectCommand(input);
  const response = await s3.send(command);
  return response;
};
