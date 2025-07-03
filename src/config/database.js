const mongoose = require('mongoose');
const url = process.env.DB_CONNECTION_URL

const connectionDB = async () => {
    await mongoose.connect(url);
}

module.exports = connectionDB;