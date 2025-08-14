const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { playController } = require('../controllers');

// middleware that is specific to this router

router.get('/', playController.getPlays);

router.get('/get-latest-plays', playController.getLatestsPlays)
router.get('/:playId', playController.getPlay);


router.post('/create-play', playController.createPlay)

router.put('/:playId/edit', playController.editPlay);
router.delete('/:playId/delete', playController.deletePlay);

router.patch('/:playId/add-rating', auth(), playController.addRating)
router.get('/:playId/user-rating', auth(), playController.getUserRating)
// router.put('/:playId/add-rating', auth(), playController.addRating)

module.exports = router