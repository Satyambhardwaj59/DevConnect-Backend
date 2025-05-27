const mongoose = require('mongoose');
const url = "mongodb+srv://satyambhardwaj59:G5qeD7MK14UZsjGb@satyamdb.mwmkzy1.mongodb.net/Dev-connect";

const connectionDB = async () => {
    await mongoose.connect(url);
}

module.exports = connectionDB;