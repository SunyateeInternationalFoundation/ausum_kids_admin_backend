const Parents = require("../models/parents");
const Children = require("../models/children");
const { ObjectId } = require("mongoose").Types;
const getParents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const parents = await Parents.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalDocuments = await Parents.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      success: true,
      data: parents,
      meta: {
        totalDocuments,
        totalPages,
        currentPage: parseInt(page),
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

const getParent = async (req, res) => {
  try {
    const parent = await Parents.findById(req.params.id);
    console.log("parent", parent);
    const child = await Children.find({ parentId: parent._id });
    console.log("child", child);
    res.status(200).json({ success: true, data: parent, child });
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }
};

const deleteParent = async (req, res) => {
  try {
    const parent = await Parents.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: parent });
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }
};

const createParent = async (req, res) => {
  try {
    const parent = await Parents.create(req.body);
    res.status(200).json({ success: true, data: parent });
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }
};

const updateParent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, city, pincode, verfied, image } =
      req.body;

    const updatedParent = await Parents.findByIdAndUpdate(
      id,
      { name, email, phone, address, city, pincode, verfied, image },
      { new: true, runValidators: true }
    );
    if (!updatedParent) {
      return res
        .status(404)
        .json({ success: false, message: "Parent not found" });
    }
    res.status(200).json({ success: true, data: updatedParent });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateVerify = async (req, res) => {
  try {
    const { id } = req.params;
    // const { verified } = req.body;

    const updatedParent = await Parents.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true, runValidators: true }
    );
    if (!updatedParent) {
      return res
        .status(404)
        .json({ success: false, message: "Parent not found" });
    }
    res.status(200).json({ success: true, data: updatedParent });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getParents,
  getParent,
  deleteParent,
  createParent,
  updateParent,
  updateVerify,
};
