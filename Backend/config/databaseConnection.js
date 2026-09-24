const mongoose = require('mongoose');

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then((data) => {
            console.log(`Database is connected with ${data.connection.host}`);
        })
        .catch((err) => {
            console.log('error=========>', err);
        });
};

module.exports = databaseConnection;