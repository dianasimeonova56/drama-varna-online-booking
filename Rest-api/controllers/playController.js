const { userModel, playModel } = require('../models');

function newPlay(playData) {
    return playModel.create(playData)
    // .then(post => {
    //     return Promise.all([
    //         userModel.updateOne({ _id: userId }, { $push: { plays: post._id }, $addToSet: { themes: themeId } }),
    //         themeModel.findByIdAndUpdate({ _id: themeId }, { $push: { posts: post._id }, $addToSet: { subscribers: userId } }, { new: true })
    //     ])
    // })
}

function getLatestsPlays(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    playModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .then(plays => {
            res.status(200).json(plays)
        })
        .catch(next);
}

function getPlays(req, res, next) {
    return playModel.find()
        // .populate('director')
        // .populate('ratings.user')
        .then(plays => {
            res.status(200).json(plays)
        })
        .catch(next);;
}

function getPlay(req, res, next) {
    const playId = req.params.playId;

    return playModel.findById(playId)
        // .populate('director')
        .then(play => {
            res.status(200).json(play)
        })
        .catch(next);;
}

function createPlay(req, res, next) {
    const { playData } = req.body;

    newPlay(playData)
        .then(createdPlay => res.status(200).json(createdPlay))
        .catch(next);
}

function editPlay(req, res, next) {
    const { playId } = req.params;
    const { playData } = req.body;

    playModel.findByIdAndUpdate(playId, playData, { new: true })
        .then(updatedPlay => {
            if (updatedPlay) {
                res.status(200).json(updatedPlay);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deletePlay(req, res, next) {
    const { playId } = req.params;

    playModel.findByIdAndDelete(playId)
        .then(deletedPlay => {
            if (deletedPlay) {
                res.status(200).json(deletedPlay);
            } else {
                res.status(404).json({ message: 'Play not found' });
            }
        })
        .catch(next);
}

async function addRating(req, res, next) {
    const { playId } = req.params;
    const { rating } = req.body;
    const userId = req.user._id.toString();
    // console.log(req.user, userId);
    

    try {
        const play = await playModel.findById(playId);

        if (!play) {
            return res.status(404).json({ message: 'Play not found' });
        }

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const existingRating = play.ratings.find(r => r.user.toString() === userId);

        if (existingRating) {
            existingRating.rating = rating;
        } else {
            play.ratings.push({ user: userId, rating });
        }

        const total = play.ratings.reduce((sum, r) => sum + r.rating, 0);
        play.averageRating = Number((total / play.ratings.length).toFixed(2));

        await play.save();

        return res.status(200).json({ message: 'Rating submitted!', averageRating: play.averageRating });
    } catch (err) {
        next(err);
    }
}

async function getUserRating(req, res, next) {
    const play = await playModel.findById(req.params.playId);
    const userId = req.user._id.toString();

    const rating = play.ratings.find(r => r.user.toString() === userId);
    if (rating) {
        return res.json({ hasRated: true, message: "User has already rated this play!" });
    }
    res.json({ rating: false })
}

module.exports = {
    newPlay,
    getPlay,
    getPlays,
    getLatestsPlays,
    createPlay,
    editPlay,
    deletePlay,
    addRating,
    getUserRating,
}
