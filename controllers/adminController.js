const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../models/admin");
dotenv.config();

function isStringInvalid(string) {
  return string === undefined || string.length === 0;
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`email: ${email} password: ${password}`);
    if (isStringInvalid(email) || isStringInvalid(password)) {
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
    })
    res.status(200).json({
      success: true,
      data: admin,
      message: `Admin added successfully`,
    });
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }

}

module.exports = {
  login,
  updateProfile,
  addAdmin
};
