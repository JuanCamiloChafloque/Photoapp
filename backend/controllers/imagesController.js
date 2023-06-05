const { StatusCodes } = require("http-status-codes");
const {
  insertImage,
  insertImageMetadata,
  getUserById,
  getImagesByUserId,
  getImageInfoByKey,
} = require("../db/queries");
const {
  uploadImageToS3,
  getS3Images,
  getS3ImagesByUser,
} = require("../s3/operations");
const { extractImageMetadata } = require("../utils/metadata");

//@desc     Upload logged-in user image
//@route    POST /api/v1/images/upload
//@access   protected
exports.uploadImage = async (req, res) => {
  const { assetName, encodedData, description } = req.body;
  if (!assetName || !encodedData || !description) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "All fields are required",
    });
  }

  try {
    const id = req.user.userId;
    const user = await getUserById(id);
    const s3Key = await uploadImageToS3(user[0].bucketFolder, encodedData);
    const result = await insertImage(id, assetName, description, s3Key);

    /*     // * TODO: Extract Metadata from the uploaded image and save the content in the db
    const { date, dev, lng, lat } = await extractImageMetadata(
      assetName,
      s3Key
    );
    await insertImageMetadata(result.insertId, dev, date, lng, lat); */

    await res.status(StatusCodes.OK).json({
      status: "success",
      message: "Successfully added new image with id: " + result.insertId,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: err,
    });
  }
};

//@desc     Get all the images from the app users
//@route    GET /api/v1/images
//@access   protected
exports.getAllImages = async (req, res) => {
  try {
    const response = await getS3Images(req.query.offset);
    res.status(StatusCodes.OK).json({
      message: "success",
      data: response["KeyCount"] > 0 ? response["Contents"] : [],
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: err,
    });
  }
};

//@desc     Get all the images from the logged-in user
//@route    GET /api/v1/images/:id
//@access   protected
exports.getUserImages = async (req, res) => {
  try {
    const key = req.params.id;
    const response = await getImagesByUserId(req.user.userId);
    res.status(StatusCodes.OK).json({
      message: "success",
      data: response.length > 0 ? response : [],
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: err,
    });
  }
};

//@desc     Get the image details with the key 'key'
//@route    GET /api/v1/images/details
//@access   protected
exports.getImageInfoByKey = async (req, res) => {
  try {
    const key = req.query.key;
    const result = await getImageInfoByKey(key);
    res.status(StatusCodes.OK).json({
      status: "success",
      result: result[0],
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: err,
    });
  }
};
