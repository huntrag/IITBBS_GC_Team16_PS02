const reply = require("../model/Replies");
const mongoose = require("mongoose");

const getreplies = async (req, res) => {
  try {
    let sortby = { upvotes: -1 };
    let showBlacklist = { blacklist: "false" };
    if (req.session.user) showBlacklist = {};
    const replies = await reply.find(showBlacklist).sort(sortby);
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).send();
  }
};

const createreply = async (req, res) => {
  try {
    const newreply = new reply({
      username: req.user.name,
      content: req.body.content,
      userid: mongoose.Types.ObjectId(req.user._id),
      postid: mongoose.Types.ObjectId(req.body.reply_id)
    });
    await newreply.save();
    res.status(201).send();
  } catch (err) {
    res.status(500).send();
  }
};

const updatereply = async (req, res) => {
  try {
    const change = { blacklist: true };
    if (!req.body.blacklist) change.blacklist = false;
    await reply.findByIdAndUpdate(req.body.reply_id, change);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
};

const deletereply = async (req, res) => {
  try {
    await reply.findByIdAndDelete(req.body.reply_id);
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
};
module.exports = { getreplies, createreply, updatereply, deletereply };
