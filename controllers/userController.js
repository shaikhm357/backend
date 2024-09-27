const asyncHandler = require("../middleware/asyncHandler.js");
const User = require("../models/userModel.js");

// @desc    Auth user & get token
// @route   Post /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    res.send("Auth user");
});

// @desc    Register user
// @route   Post /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.send("Register user");
});

// @desc    Logout user and clear cookies
// @route   Post /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send("Logout user");
});

// @desc    Get user profile
// @route   Get /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send("Get user profile");
});

// @desc    update user profile
// @route   Put /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("Update user profile");
});

// @desc    get users
// @route   Get /api/users
// @access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
    res.send("get users admin");
});

// @desc    Delete user
// @route   Delete /api/users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send("Delete user");
});

// @desc    Get user by id
// @route   Get /api/users/:id
// @access  Private/admin
const getUserById = asyncHandler(async (req, res) => {
    res.send("Get user by id");
});

// @desc    update user
// @route   Put /api/users/:id
// @access  Private/admin
const updateUser = asyncHandler(async (req, res) => {
    res.send("update user admin");
});

module.exports =  { authUser, updateUser, getUserById, deleteUser, getUsers, updateUserProfile, getUserProfile, logoutUser, registerUser };