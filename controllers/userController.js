const asyncHandler = require("../middleware/async.js");
const User = require("../models/User.js");
const generateToken = require("./../utils/generateToken.js");
const jwt = require("jsonwebtoken")

// @desc    Auth user & get token
// @route   Post /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // set jwt as httpOnly cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });

    res.json({
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// @route   Post /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await User.create(req.body);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    Logout user and clear cookies
// @route   Post /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  // cleat the stored cookie
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   Get /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// @desc    update user profile
// @route   Put /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // Find the user by ID

  if (user) {
    // Update each field only if it's provided in the request body, otherwise retain the existing value
    user.profile_picture = req.body.profile_picture || user.profile_picture;
    user.full_name = req.body.full_name || user.full_name;
    user.date_of_birth = req.body.date_of_birth || user.date_of_birth;
    user.gender = req.body.gender || user.gender;
    user.mobile_no = req.body.mobile_no || user.mobile_no;
    user.email = req.body.email || user.email;
    user.highest_qualification =
      req.body.highest_qualification || user.highest_qualification;
    user.working_with = req.body.working_with || user.working_with;
    user.working_as = req.body.working_as || user.working_as;
    user.country = req.body.country || user.country;
    user.state = req.body.state || user.state;
    user.city = req.body.city || user.city;
    user.location = req.body.location || user.location;

    // Update the password only if it's provided in the request body
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save the updated user data
    const updatedUser = await user.save();

    // Return the updated user data
    res.json({
      _id: updatedUser._id,
      profile_picture: updatedUser.profile_picture,
      full_name: updatedUser.full_name,
      date_of_birth: updatedUser.date_of_birth,
      gender: updatedUser.gender,
      mobile_no: updatedUser.mobile_no,
      email: updatedUser.email,
      highest_qualification: updatedUser.highest_qualification,
      working_with: updatedUser.working_with,
      working_as: updatedUser.working_as,
      country: updatedUser.country,
      state: updatedUser.state,
      city: updatedUser.city,
      location: updatedUser.location,
      token: generateToken(updatedUser._id), // Return token if needed
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// @desc    get users
// @route   Get /api/users
// @access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   Delete /api/users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by id
// @route   Get /api/users/:id
// @access  Private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    update user
// @route   Put /api/users/:id
// @access  Private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); // Find the user by ID

  if (user) {
    // Update each field only if it's provided in the request body, otherwise retain the existing value
    user.profile_picture = req.body.profile_picture || user.profile_picture;
    user.full_name = req.body.full_name || user.full_name;
    user.date_of_birth = req.body.date_of_birth || user.date_of_birth;
    user.gender = req.body.gender || user.gender;
    user.mobile_no = req.body.mobile_no || user.mobile_no;
    user.email = req.body.email || user.email;
    user.highest_qualification =
      req.body.highest_qualification || user.highest_qualification;
    user.working_with = req.body.working_with || user.working_with;
    user.working_as = req.body.working_as || user.working_as;
    user.country = req.body.country || user.country;
    user.state = req.body.state || user.state;
    user.city = req.body.city || user.city;
    user.location = req.body.location || user.location;
    user.isAdmin =
      req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin; // Handle boolean fields separately

    // Update the password only if it's provided in the request body
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save the updated user data
    const updatedUser = await user.save();

    // Return the updated user data
    res.json({
      _id: updatedUser._id,
      profile_picture: updatedUser.profile_picture,
      full_name: updatedUser.full_name,
      date_of_birth: updatedUser.date_of_birth,
      gender: updatedUser.gender,
      mobile_no: updatedUser.mobile_no,
      email: updatedUser.email,
      highest_qualification: updatedUser.highest_qualification,
      working_with: updatedUser.working_with,
      working_as: updatedUser.working_as,
      country: updatedUser.country,
      state: updatedUser.state,
      city: updatedUser.city,
      location: updatedUser.location,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id), // Return token if needed
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

module.exports = {
  authUser,
  updateUser,
  getUserById,
  deleteUser,
  getUsers,
  updateUserProfile,
  getUserProfile,
  logoutUser,
  registerUser,
};
