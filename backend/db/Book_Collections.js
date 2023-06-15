const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    authorName: String,
    description: String,
    userID: String
})

module.exports = mongoose.model('Book_Collections', productSchema);