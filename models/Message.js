const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    content: {
      type: String,
      validate: {
        validator: (c) => c.length < 500,
        message: 'must be less than 500 characters',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
