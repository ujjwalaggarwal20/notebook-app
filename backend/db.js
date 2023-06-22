const mongoose = require('mongoose');
const {config} = require('dotenv');
config();

const monogoURI = process.env.MONGODB_URI;

const connectToMongo = () => {
    mongoose.connect(monogoURI, () => {
        console.log("database Connected!");
    });
};

module.exports = connectToMongo;