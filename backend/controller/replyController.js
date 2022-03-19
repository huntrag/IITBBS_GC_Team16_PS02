const reply = require("../model/Replies");
const mongoose = require("mongoose");

const getReplies = async (req, res) => {
  try {
    let sortby = { upvotes: -1 };
    const postid=req.query.postid;
    let showBlacklist = { blacklist: "false" };
    if (req.session.isAdmin) showBlacklist = {};
    const replies = await reply.find({postid:postid,showBlacklist}).sort(sortby);
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).send();
  }
};

const createReply = async (req, res) => {
  try {
    const newreply = new reply({
      username: req.user.name,
      content: req.body.content,
      userid: mongoose.Types.ObjectId(req.user._id),
      postid: mongoose.Types.ObjectId(req.body.post_id)
    });
    await newreply.save();
    res.status(201).send();
  } catch (err) {
    res.status(500).send();
  }
};

const toggleBlackListReply = async (req, res) => {
  try {
    const change = { blacklist: true };
    if (!req.query.blacklist) change.blacklist = false;
    await reply.findByIdAndUpdate(req.query.replyid, change);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
};

const deleteReply = async (req, res) => {
  try {
    const replyId=req.params.replyId.trim();
    const del_reply = await reply.findById(replyId);
    if (req.user._id.toString() === del_reply.userid.toString()) return await del_reply.delete();
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
};
module.exports = { getReplies, createReply, toggleBlackListReply, deleteReply };
