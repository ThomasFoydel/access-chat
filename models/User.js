const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (str) => {
        return str.length >= 8 && str.length <= 16;
      },
      message: 'name must be between 8 and 16 characters',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (str) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(str).toLowerCase());
      },
      message: 'must be a valid email',
    },
  },
});

module.exports = mongoose.model('User', userSchema);
