const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { playController } = require('../controllers');

// middleware that is specific to this router

router.get('/', playController.getPlays);
router.post('/', auth(), playController.createPlay);

router.get('/get-latest-plays', playController.getLatestsPlays)
router.get('/:playId', playController.getPlay);


router.put('/:playId/edit', auth(), playController.editPlay);
router.delete('/:playId/delete', auth(), playController.deletePlay);

router.put('/:playId/add-rating', auth(), playController.addRating)

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router