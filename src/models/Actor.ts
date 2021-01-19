const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
});

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = mongoose.model('actors', actorSchema);
