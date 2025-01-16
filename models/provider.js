const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    serviceName: { type: [String] },
    address: { type: String },
    state: { type: String },
    languages: { type: [String] },
    bio: { type: String },
    dob: { type: String },
    country: { type: String },
    gender: { type: String },
    city: { type: String },
    pincode: { type: String },
    password: { type: String },
    userName: { type: String },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "services" }],
    stats: {
      earnings: { type: String, default: "₹0" },
      customers: { type: Number, default: 0 },
      sessions: { type: Number, default: 0 },
    },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Provider = mongoose.model("providers", providerSchema);

module.exports = Provider;
