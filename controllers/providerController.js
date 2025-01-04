const Provider = require("../models/provider");


const getProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.status(200).json({ success: true, data: providers });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

const getProvider = async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        res.status(200).json({ success: true, data: provider });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

module.exports = {
    getProviders,
    getProvider
}