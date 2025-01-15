const Provider = require("../models/provider");
const Services = require("../models/services");


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
        const provider = await Provider.findById(req.params.id).populate('services', 'name');
        if (!provider) {
            return res.status(404).json({ success: false, message: 'Provider not found' });
        }
        res.status(200).json({ success: true, data: provider });
    } catch (err) {
        console.error(err); 
        res.status(400).json({ message: err.message, success: false });
    }
};



module.exports = {
    getProviders,
    getProvider
}