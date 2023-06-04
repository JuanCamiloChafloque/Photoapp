const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { getUserByEmail, insertUser, updateUser } = require("../db/queries");
const { createJWT } = require("../utils/jwt");

//@desc     Register a user
//@route    POST /api/v1/users/register
//@access   public
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "All fields are required",
    });
  }

  const user = await getUserByEmail(email);
  if (user.length !== 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Email provided is already in use",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const bucketFolder = uuidv4();
  const result = await insertUser(
    email,
    hashPassword,
    lastName,
    firstName,
    bucketFolder
  );

  const token = createJWT(result.insertid);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    user: {
      id: result.insertid,
      email,
      firstName,
      lastName,
      bucketFolder,
    },
    token: token,
  });
};

//@desc     Login a user
//@route    POST /api/v1/users/login
//@access   public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "All fields are required",
    });
  }

  const user = await getUserByEmail(email);
  if (user.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Invalid email/password",
    });
  }

  const comparePassword = await bcrypt.compare(password, user[0].password);
  if (!comparePassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Invalid email/password",
    });
  }

  const token = createJWT(user[0].id);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    user: {
      id: user[0].id,
      email: user[0].email,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      bucketFolder: user[0].bucketFolder,
    },
    token: token,
  });
};

//@desc     Update logged-in user info
//@route    POST /api/v1/auth/update
//@access   protected
exports.updateProfile = async (req, res) => {
  const { email, firstName, lastName } = req.body;
  if (!email || !firstName || !lastName) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "All fields are required",
    });
  }

  const id = req.user.userId;
  await updateUser(id, email, firstName, lastName);
  const user = await getUserByEmail(email);

  const token = createJWT(user[0].id);
  res.status(StatusCodes.OK).json({
    status: "success",
    user: {
      id: user[0].id,
      email: user[0].email,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      bucketFolder: user[0].bucketFolder,
    },
    token: token,
  });
};
