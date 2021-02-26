const express = require('express');
const router = express.Router();
const User = require('../models/User');
const API = require('../controller/API');

router.post('/register', async (req, res) => {
  let { email, name, password, confirmpassword } = req.body || {};
  let allFieldsExist = email && name && password && confirmpassword;
  if (!allFieldsExist) {
    return res.status(400).send({ err: 'All fields required' });
  }

  const secure = /^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/;
  if (!secure.test(String(password).toLowerCase())) {
    return res.status(400).send({ err: 'Password must be more secure' });
  }

  if (name.length < 8 || name.length > 16) {
    return res
      .status(400)
      .send({ err: 'Name must be between 8 and 16 characters' });
  }

  if (password !== confirmpassword) {
    return res.status(400).send({ err: 'Passwords do not match' });
  }

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    return res.status(400).send({ err: 'Valid email required' });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .send({ err: 'Account with this email already exists' });
  }

  API.createUser({ email, name, password })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch(() =>
      res
        .status(500)
        .send({ err: 'Database is down, we are working to fix this' })
    );
});

module.exports = router;
