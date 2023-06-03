const express = require("express");
const {
  login,
  register,
  updateProfile,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(authMiddleware, updateProfile);

module.exports = router;
