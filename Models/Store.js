// SETUP MONGODB
const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');


//https://mongoosejs.com/docs/geojson.html
//GeoJSON is a format for storing geographic points and polygons.
const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Please Comic Shop Name'],
        unique: true,
        trim: true,
        maxlength: [20, 'Store ID must be less than 20 chars']
    },

    address: {
        type: String,
        required: [true, 'Add an address']
    },

    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        //Location information
        formattedAddress: String
    },
    //current date and time
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//GEOCODER LOCATION CREATION
//Displays different location fields for my database
StoreSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    console.log(loc);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        //Displays location information like city, country, address, zipcode etc.
        formattedAddress: loc[0].formattedAddress
    };

    // Will not save user entered address, only formattedAddress will be saved
    this.address = undefined;
    next();
});



module.exports = mongoose.model('Store', StoreSchema);