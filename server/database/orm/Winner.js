const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'Participant'
    },
    prize: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prize'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Winner', schema);