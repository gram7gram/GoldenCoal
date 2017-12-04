const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Prize', schema);