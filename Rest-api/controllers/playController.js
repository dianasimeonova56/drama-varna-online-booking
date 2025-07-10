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

    // if the userId is not the same as this one of the post, the post will not be updated
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
    const {playId} = req.params;
    const { rating } = req.body;
    // const { _id: userId } = req.user;
    

     try {
        const play = await playModel.findById(playId);
        console.log(play);
        
        

        if (!play) {
            return res.status(404).json({ message: 'Play not found' });
        }

        // const existingRating = play.ratings.find(r => r.user.toString() === userId);

        // if (existingRating) {
        //     existingRating.rating = rating;
        // } else {
            play.ratings.push({ user: "686e3a5899ccbc29fcf87ba5", rating });
        //}

        const total = play.ratings.reduce((sum, r) => sum + r.rating, 0);
        play.averageRating = total / play.ratings.length;

        await play.save();

        return res.status(200).json({ message: 'Rating submitted!', averageRating: play.averageRating });
    } catch (err) {
        next(err);
    }
}

// function like(req, res, next) {
//     const { postId } = req.params;
//     const { _id: userId } = req.user;

//     console.log('like')

//     postModel.updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
//         .then(() => res.status(200).json({ message: 'Liked successful!' }))
//         .catch(next)
// }

module.exports = {
    newPlay,
    getPlay,
    getPlays,
    getLatestsPlays,
    createPlay,
    editPlay,
    deletePlay,
    addRating,
}
