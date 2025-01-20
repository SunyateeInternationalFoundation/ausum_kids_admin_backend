const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../models/admin");
dotenv.config();

const isStringInvalid = (str, type = "string") => {
  if (!str || typeof str !== "string" || str.trim().length === 0) return true;

  if (type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    return !emailRegex.test(str.trim());
  }

  if (type === "phone") {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 international phone format
    return !phoneRegex.test(str.trim());
  }

  return false; // Valid string
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`email: ${email} password: ${password}`);
    if (isStringInvalid(email, "email") || isStringInvalid(password)) {
      return res
        .status(400)
        .json({ success: false, message: `Email and password is missing` });
    }
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `Kindly contact admins to create an account`,
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: `Invalid email or password`,
      });
    } else {
      res.status(200).json({
        admin: user,
        success: true,
        message: `User Logged in succesfully`,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const admin = await Admin.findOne({ email });
    console.log("admin", admin);
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: `Admin not found`,
      });
    }
    const updatedAdmin = await Admin.updateOne(
      { _id: admin._id },
      { firstName, lastName }
    );

    res.status(200).json({
      data: updatedAdmin,
      success: true,
      message: `Admin profile updated successfully`,
    });
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { email, password, isSuperAdmin } = req.body;
    const admin = await Admin.create({
      email,
      password,
      isSuperAdmin,
    });
    res.status(200).json({
      success: true,
      data: admin,
      message: `Admin added successfully`,
    });
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }
};
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ success: true, data: admins });
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }
};
module.exports = {
  login,
  updateProfile,
  addAdmin,
  getAdmins,
};
