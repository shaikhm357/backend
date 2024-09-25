const mongoose = require('mongoose');

const MosqueDetailsSchema = new mongoose.Schema({
    image: {
        type: String,  // URL to the mosque image
        required: false
    },
    name: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    todayNamazTimings: {
        fazar: {
            type: String,
            required: true
        },
        zohar: {
            type: String,
            required: true
        },
        asr: {
            type: String,
            required: true
        },
        magrib: {
            type: String,
            required: true
        },
        isha: {
            type: String,
            required: true
        }
    },
    jummaTimings: {
        numberOfJammat: {
            type: Number,
            enum: [1, 2, 3],  // Number of Jumma jammats
            required: true
        },
        timings: {
            type: [String],  // Array of Jumma timings (could be multiple)
            required: true
        }
    },
    eidUlAdhaTimings: {
        numberOfJammat: {
            type: Number,
            enum: [1, 2, 3],  // Number of Eid ul Adha jammats
            required: true
        },
        timings: {
            type: [String],  // Array of timings for each Jammat
            required: true
        }
    },
    eidUlFitrTimings: {
        numberOfJammat: {
            type: Number,
            enum: [1, 2, 3],  // Number of Eid ul Fitr jammats
            required: true
        },
        timings: {
            type: [String],  // Array of timings for each Jammat
            required: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('MosqueDetail', MosqueDetailsSchema);
