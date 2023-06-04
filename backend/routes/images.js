const express = require("express");
const {
  uploadImage,
  getAllImages,
} = require("../controllers/imagesController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.route("/").get(authMiddleware, getAllImages);
router.route("/upload").post(authMiddleware, uploadImage);

module.exports = router;
