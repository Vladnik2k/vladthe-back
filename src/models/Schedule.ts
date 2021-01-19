const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    concert: {
        ref: 'concerts',
        type: Schema.Types.ObjectId,
        required: true,
    },
    startedAt: {
        type: Date,
        required: true,
    }
});

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = mongoose.model('schedules', scheduleSchema);
