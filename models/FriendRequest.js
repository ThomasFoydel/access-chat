const mongoose = require('mongoose');

const friendRequestSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FriendRequest', friendRequestSchema);
