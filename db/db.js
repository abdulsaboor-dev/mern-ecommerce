const mongoose = require('mongoose');
const { DB_URL } = require('../utils/Config');

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
        });
        console.log('Database connected..');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

module.exports = connectDB;