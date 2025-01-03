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

const updateService = async (req, res) => {
    try {
        const updatedService  = await Service.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    about: req.body.about,
                    price: req.body.price,
                    sessions: req.body.sessions
                }
            }
        );  
        res.status(200).json({ success: true, data: updatedService });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

const deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: deletedService });
    } catch (err) {
        res.status(400).json({ message: err, success: false });
    }
}

module.exports = {
    getServices,
    addService,
    updateService,
    deleteService
}