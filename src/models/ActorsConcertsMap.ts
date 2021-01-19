const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorsConcertsMap = new Schema({
    actor: {
        ref: 'actors',
        type: Schema.Types.ObjectId,
        required: true,
    },
    concert: {
        ref: 'concerts',
        type: Schema.Types.ObjectId,
        required: true,
    },
});

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = mongoose.model('actors_concerts_mapping', actorsConcertsMap);
