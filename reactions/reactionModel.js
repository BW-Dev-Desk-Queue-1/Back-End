const UserDb = require('../config/dbConfig');
module.exports = {
    addReaction,
    updateReaction,
    deleteReaction,
    findByReactionId
}
// my code using Won's as a template
function addReaction(reaction) {
    return UserDb('reactions')
    .insert(reaction)
    .then(([id]) => {

      return findByReactionId(id)
    });

}

function updateReaction(reactionId) {
    return UserDb('reactions')
      .update(reaction)
      .where('id', reactionId)
      .then(num =>
        num ? ticket : { message: 'Failed to update in the server' }
      );
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
      .where({ id })
      .first();
  }
  