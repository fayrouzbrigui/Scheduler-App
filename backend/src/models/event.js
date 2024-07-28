const mongoose = require("../configuration/dbConfig");

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    importance: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
});

module.exports = mongoose.model('Event', eventSchema);