const {Schema, model} = require("mongoose");

const userEventSchema = new Schema({
    user_id : {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    event_id: {
        type: Schema.Types.ObjectId,
        ref: 'event'
    },
    ticket_booked: {
        type: Number,
        required: true
    }
},{timestamps: true});

module.exports = model('user_event', userEventSchema);