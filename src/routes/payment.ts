const express = require('express');
const paymentController = require('../controllers/payment');
const router = express.Router();
const passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), paymentController.createPayment);
router.delete('/:id', passport.authenticate('jwt', { session: false }), paymentController.removePayment);
router.get('/', passport.authenticate('jwt', { session: false }), paymentController.getPayment);

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = router;
