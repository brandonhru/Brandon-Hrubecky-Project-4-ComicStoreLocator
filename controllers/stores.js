const Store = require('../models/Store');

//Get all stores information
exports.getStores = async(req, res, next) => {
    try {
        const stores = await Store.find();

        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


//Creating new stores
exports.addStore = async(req, res, next) => {
    try {
        const store = await Store.create(req.body);

        return res.status(201).json({
            success: true,
            data: store
        });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            //400 signifys user error
            return res.status(400).json({ error: 'This Comic Shop already exsits' }); //Comic shop has already been documented the following message will appear
        }
        res.status(500).json({ error: 'Server error' });
    }
};