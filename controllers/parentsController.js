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

const createParent = async (req, res) => {
    try {
        const parent = await Parents.create(req.body);
        res.status(200).json({ success: true, data: parent });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

const updateParent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, city, pincode , verfied, image } = req.body;

        const updatedParent = await Parents.findByIdAndUpdate(
            id,
            { name, email, phone, address, city, pincode , verfied, image },
            { new: true, runValidators: true }
        );
        if(!updatedParent){
            return res.status(404).json({ success: false, message: 'Parent not found' });
        }
        res.status(200).json({ success: true, data: updatedParent });
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }

}

const updateVerify = async (req, res) => {
    try {
        const { id } = req.params;
        const { verified } = req.body;

        const updatedParent = await Parents.findByIdAndUpdate
        (id, { verified }, { new: true, runValidators: true });
        if (!updatedParent) {
            return res.status(404).json({ success: false, message: 'Parent not found' });
        }
        res.status(200).json({ success: true, data: updatedParent });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}


module.exports = {
    getParents,
    getParent,
    deleteParent,
    createParent,
    updateParent,
    updateVerify
};