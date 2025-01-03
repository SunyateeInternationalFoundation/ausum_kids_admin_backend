const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "parents" },
    verified: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
});

const Child = mongoose.model("children", childSchema);

module.exports = Child;