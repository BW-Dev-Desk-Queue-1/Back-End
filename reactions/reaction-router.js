const router = require('express').Router();

const Reaction = require('../reactions/reactionModel')

// works locally
router.get('/', (req, res) => {

    Reaction.findAllReactions()
        .then(reactions => {
            res.status(200).json(reactions)
        })
        .catch(err => {
            res.status(400).json({message: "can't get any reactions"})
        })
})

module.exports = router
