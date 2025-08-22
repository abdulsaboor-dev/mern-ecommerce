const mongoose = require('mongoose');

//const DB = 'mongodb://localhost:27017/mernCrud';
const DB = 'mongodb+srv://abdulsaboordev:oTWR6TE9auaqKolw@mernecommerce.pehabyb.mongodb.net/mernCrud';

const connectDB = async () => {
    try {
        await mongoose.connect(DB, {
        });
        console.log('Database connected..');
    } catch (error) {
        console.error('Database connection failed:', error);
        // process.exit(1);
    }
};

module.exports = connectDB;