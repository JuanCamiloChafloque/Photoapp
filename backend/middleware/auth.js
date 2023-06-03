const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Authentication Invalid",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, "CS310_JWT_SECRET_KEY");
    req.user = { userId: payload.id };
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Authentication Invalid",
    });
  }
};

module.exports = auth;
