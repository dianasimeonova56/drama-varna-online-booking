const router = require('express').Router();
const users = require('./users');
const plays = require('./plays');
const tickets = require('./tickets');
const test = require('./test');
const bookings = require('./booking')
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/plays', plays);
router.use('/tickets', tickets);
router.use('/bookings', bookings);
router.use('/test', test);


module.exports = router;
