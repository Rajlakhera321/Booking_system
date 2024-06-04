const {Schema, model} = require("mongoose");

const eventSchema = new Schema({
    eventName : {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    available_tickets: {
        type: Number,
        required: true
    },
},{timestamps: true});

module.exports = model('evnet', eventSchema);