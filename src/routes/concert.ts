const express = require('express');
const actorController = require('../controllers/actor');
const concertController = require('../controllers/concert');
const router = express.Router();

router.get('/', concertController.getConcerts);
router.get('/:id', concertController.getConcertById);
router.get('/:id/actors', actorController.getActorsByConcertId);
router.get('/:id/schedules', concertController.getSchedulesByConcertId);

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = router;
