const Child = require("../models/children");


const getChildren = async (req, res) => {
    try {
        const children = await Child.find();
        res.status(200).json({ success: true, data: children });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

const getChild = async (req, res) => {
    try {
        const child = await Child.findById(req.params.id);
        res.status(200).json({ success: true, data: child });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}
module.exports = {  
    getChildren,
    getChild
}