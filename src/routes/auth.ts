const express = require('express');
const authController = require('../controllers/user');
const router = express.Router();
const passport = require('passport');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/user', passport.authenticate('jwt', { session: false }), authController.getUserDetails);
router.patch('/change-pass', passport.authenticate('jwt', { session: false }), authController.changePassword);

export {}; // ToDo add normal solving of issue "Cannot redeclare block-scoped variable"
module.exports = router;
