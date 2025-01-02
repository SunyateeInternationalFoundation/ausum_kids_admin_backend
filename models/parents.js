const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  verified: { type: Boolean, default: false },
  image: { type: String, required: false },
});

const Parent = mongoose.model("parents", parentSchema);
module.exports = Parent;
