const UserDb = require('../config/dbConfig');
module.exports = {
    findAllReactions,

    addReaction,
    updateReaction,
    deleteReaction,
    findByReactionId
}
function findAllReactions() {
    return UserDb('reactions')
}

// my code using Won's as a template
function addReaction(reaction) {
    // console.log('adding reaction', reaction)
    return UserDb('reactions')
    .insert(reaction, 'id')
    .then(([id]) => {
        // console.log('added', id, reaction)
      return findByReactionId(id)
    });

}

function updateReaction(reaction, reactionId) {
    // console.log('updating', reaction, reactionId)
    return UserDb('reactions')
      .update(reaction)
      .where('id', reactionId)
      .then(num => {
        // console.log(num)
        return  num ? reaction : { message: 'Failed to update in the server' }
      });
}

function deleteReaction(reactionId) {
    return UserDb('reactions')
      .where('id', reactionId)
      .del()
      .then(num =>
        num
          ? { message: 'successfuly deleted...' }
          : { message: 'Failed to delete...' }
      );

}


function findByReactionId(reactionId) {
    return UserDb('reactions')
      .where('id',  reactionId)
      .first();
  }
  