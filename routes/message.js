const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth');
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  const { sender, receiver, content } = req.body;
  // const sender = req.tokenUser.userId;

  Message.create({ sender, receiver, content })
    .then((message) => res.status(201).send(message))
    .catch((err) => {
      console.log('new message error: ', err);
      return res
        .status(500)
        .send({ err: 'Database is down, we are working to fix this' });
    });
});

module.exports = router;
