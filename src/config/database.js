const mongoose = require('mongoose');
const url = require('../DB-URL');

const connectionDB = async () => {
    await mongoose.connect(url);
}

module.exports = connectionDB;