const express = require("express");
const {
  uploadImage,
  getAllImages,
  getImageByKey,
} = require("../controllers/imagesController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.route("/details").get(authMiddleware, getImageByKey);
router.route("/").get(authMiddleware, getAllImages);
router.route("/upload").post(authMiddleware, uploadImage);

module.exports = router;
