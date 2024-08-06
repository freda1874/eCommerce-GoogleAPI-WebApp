// db.js
const mongoose = require('mongoose');

let databaseConnection = null;

const connectToDatabase = async () => {
    if (databaseConnection) {
        return databaseConnection;
    }

    try {
        databaseConnection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to the database');
        return databaseConnection;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

const closeDatabaseConnection = async () => {
    if (databaseConnection) {
        try {
            await mongoose.connection.close();
            console.log('Database connection closed');
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    }
};

module.exports = {
    connectToDatabase,
    closeDatabaseConnection,
};
