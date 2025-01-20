const mongoose = require('mongoose');

const databaseConnection = () => {
    mongoose.connect('mongodb://localhost:27017/tictactoe')
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error connecting to database", err));
};

module.exports = { databaseConnection };
