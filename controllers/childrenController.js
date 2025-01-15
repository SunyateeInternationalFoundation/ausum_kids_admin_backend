const Child = require("../models/children");

const getChildren = async (req, res) => {
    try {
        const children = await Child.find()
        .populate("parent")
        res.status(200).json({ success: true, data: children });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

const getChild = async (req, res) => {
    try {
        const child = await Child.findById(req.params.id)
        .populate("parent")
        res.status(200).json({ success: true, data: child });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

const addChild = async (req, res) => {
    try {
        const child = await Child.create(req.body);
        res.status(200).json({ success: true, data: child });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

const deleteChild = async (req, res) => {
    try {
        const child = await Child.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: child });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

const updateChild = async (req, res) => {
    try {
        const { id } = req.params;
        const { name} = req.body;
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}


module.exports = {  
    getChildren,
    getChild,
    addChild,
    deleteChild,
   updateChild
}