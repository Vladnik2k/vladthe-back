// database
const configs = require('./configs');
const mongoose = require('mongoose');
mongoose.connect(configs.mongoURI, configs.mongoData).then(() => console.log('Connected to MongoDB')).catch((err: any) => console.log(err));

// app
const passport = require('passport');
const express = require('express');
const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(require('morgan')('dev'));
app.use(require('cors')());
require('./passport')(passport);

// routing
const actorRoutes = require('./routes/actor');
const concertRoutes = require('./routes/concert');
const paymentRoutes = require('./routes/payment');
const authRoutes = require('./routes/auth');
app.use('/api/actors', actorRoutes);
app.use('/api/concerts', concertRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);

// email
require('./utils/emails/email');

module.exports = app;
