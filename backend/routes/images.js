const express = require("express");
const {
  uploadImage,
  getAllImages,
  getImageInfoByKey,
  getUserImages,
} = require("../controllers/imagesController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.route("/details").get(authMiddleware, getImageInfoByKey);
router.route("/").get(authMiddleware, getAllImages);
router.route("/:id").get(authMiddleware, getUserImages);
router.route("/upload").post(authMiddleware, uploadImage);

module.exports = router;
