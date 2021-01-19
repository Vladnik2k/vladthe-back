const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const concertSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
});

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = mongoose.model('concerts', concertSchema);
