const { StatusCodes } = require("http-status-codes");
const {
  insertImage,
  insertImageMetadata,
  getUserById,
  getImagesByUserId,
  getImageInfoByKey,
  getImagesByMetadataFilter,
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
  const { assetName, encodedData, description, date, lng, lat } = req.body;
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
    //await insertImageMetadata(result.insertId, date, lng, lat);

    await res.status(StatusCodes.OK).json({
      status: "success",
      message: `Successfully added the new image ${assetName} to your profile`,
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
    const { offset, date, lng, lat } = req.query;
    let response = undefined;

    if (date || lng || lat) {
      response = await getS3Images(offset, 100);
      const assets = await getImagesByMetadataFilter(date, lat, lng);
      const filteredAssetsBucketKeys = assets.map((asset) => asset.bucketKey);
      const filteredResults = response["Contents"].filter((asset) =>
        filteredAssetsBucketKeys.includes(asset.Key)
      );
      return res.status(StatusCodes.OK).json({
        message: "success",
        data: filteredResults.length > 0 ? filteredResults : [],
      });
    }

    response = await getS3Images(offset, 6);
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
