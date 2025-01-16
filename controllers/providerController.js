const Provider = require("../models/provider");
const Services = require("../models/services");

const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find();

    res.status(200).json({ success: true, data: providers });
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }
};

const getProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).populate(
      "services",
      "name"
    );
    if (!provider) {
      return res
        .status(404)
        .json({ success: false, message: "Provider not found" });
    }
    res.status(200).json({ success: true, data: provider });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message, success: false });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: provider });
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }
};

const createProvider = async (req, res) => {
  try {
    const provider = await Provider.create(req.body);
    res.status(200).json({ success: true, data: provider });
  } catch (err) {
    res.status(400).json({ message: err, success: false });
  }
};

const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      address,
      city,
      pincode,
      verfied,
      image,
      state,
      country,
    } = req.body;

    const updatedProvider = await Provider.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        address,
        city,
        pincode,
        verfied,
        image,
        state,
        country,
      },
      { new: true, runValidators: true }
    );
    if (!updatedProvider) {
      return res
        .status(404)
        .json({ success: false, message: "provider not found" });
    }
    res.status(200).json({ success: true, data: updatedProvider });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateVerify = async (req, res) => {
  try {
    const { id } = req.params;
    // const { verified } = req.body;

    const updatedProvider = await Provider.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true, runValidators: true }
    );
    if (!updatedProvider) {
      return res
        .status(404)
        .json({ success: false, message: "provider not found" });
    }
    res.status(200).json({ success: true, data: updatedProvider });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getProviders,
  getProvider,
  createProvider,
  updateProvider,
  updateVerify,
  deleteProvider,
};
