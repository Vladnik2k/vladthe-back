const express = require('express');
const actorController = require('../controllers/actor');
const concertController = require('../controllers/concert');
const router = express.Router();

router.get('/', actorController.getActors);
router.get('/:id', actorController.getActorById);
router.get('/:id/concerts', concertController.getConcertsByActorId);

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = router;
