const replyModel = require('../model/Reply');
const mongoose = require('mongoose');

const createReply = async (req, res) => {
  try {
    const newReply = new replyModel({
      username: req.user.name,
      content: req.body.content,
      userid: mongoose.Types.ObjectId(req.user._id),
      postid,
    });
    await newReply.save();
    res.status(201).send();
  } catch (err) {
    res.status(500).send();
  }
};
