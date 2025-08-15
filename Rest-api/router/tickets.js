const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { ticketController } = require('../controllers');

// middleware that is specific to this router
router.get('/:userId', auth(), ticketController.getTickets);

router.get('/:ticketId', auth(), ticketController.getTicket);

router.post('/', auth(), ticketController.createTicket);

router.put('/:ticketId', auth(), ticketController.editTicket);

router.delete('/:ticketId', auth(), ticketController.deleteTicket)

module.exports = router
