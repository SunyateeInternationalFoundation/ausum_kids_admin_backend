const Service = require('../models/services');


const addService = async (req, res) => {
    const service = new Service({
        name: req.body.name,
        about: req.body.about,
        price: req.body.price,
        sessions: req.body.sessions
    });

    try {
        const savedService = await service.save();
        res.status(200).json({ success: true, data: savedService });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({ success: true, data: services });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}



module.exports = {
    getServices,
    addService
}