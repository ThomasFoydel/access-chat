const User = require('../models/User');

const API = {
  createUser: (user) => User.create(user),
};

module.exports = API;
