const Parents = require('../models/parents');

const getParents = async (req, res) => { 
    try {
        const parents = await Parents.find();
        res.status(200).json({ success: true, data: parents });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}
const getParent = async (req, res) => {
    try {
        const parent = await Parents.findById(req.params.id);
        res.status(200).json({ success: true, data: parent });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

const deleteParent = async (req, res) => {
    try {
        const parent = await Parents.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: parent });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

module.exports = {
    getParents,
    getParent,
    deleteParent
};