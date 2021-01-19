const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = mongoose.model('users', userSchema);
