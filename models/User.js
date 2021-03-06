const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    unique: true,
    validate: {
      validator: (str) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(str).toLowerCase());
      },
      message: 'must be a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
});

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

module.exports = mongoose.model('User', userSchema);
