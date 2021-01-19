const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true,
    },
    schedule: {
        ref: 'schedules',
        type: Schema.Types.ObjectId,
        required: true,
    },
    numberOfSites: {
        type: Number,
        required: true,
    },
    payed: {
        type: Number,
        required: true,
    },
    doneAt: {
        type: Date,
        required: true,
    },
});

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = mongoose.model('payments', paymentSchema);
