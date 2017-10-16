const mongoose = require('mongoose');
const mongoose_csv = require('mongoose-csv');

const schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    position: {
        name : {
            type: String,
            trim: true
        }
    },
    legalName: {
        type: String,
        trim: true
    },
    pharmacy: {
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
        }
    },
    address: {
        region: {
            name: {
                type: String,
                trim: true
            }
        },
        city: {
            type: String,
            trim: true
        },
        street: {
            type: String,
            trim: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

schema.plugin(mongoose_csv)

const Participant = mongoose.model('Participant', schema);

module.exports = Participant;