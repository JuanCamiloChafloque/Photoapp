const { StatusCodes } = require("http-status-codes");
const {
  insertImage,
  getUserById,
  getUserByImageKey,
} = require("../db/queries");
const {
  uploadImageToS3,
  getS3Images,
  getS3ImageByKey,
} = require("../s3/operations");

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

    res.status(StatusCodes.OK).json({
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

//@desc     Get all the images from the app users
//@route    GET /api/v1/images/details
//@access   protected
exports.getImageByKey = async (req, res) => {
  try {
    const key = req.query.key;
    const response = await getS3ImageByKey(key);
    console.log(response);
    //const user = await getUserByImageKey(key);
    res.status(StatusCodes.OK).json({
      message: "success",
      //image: response,
      //user: user,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: err,
    });
  }
};
