const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    okpo: {
        type: String,
        index: true,
        unique: true,
        trim: true
    },
    type: {
        name: {
            type: String,
            trim: true
        }
    },
    name: {
        type: String,
        trim: true
    },
    number: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Pharmacy', schema);