const post = require("../model/Posts");
const mongoose = require("mongoose");

const getAllPost = async (req, res) => {
  try {
    let sortby = { modifiedAt: -1 };
    let showBlacklist = { blacklist: "false" };
    if (req.session.user) showBlacklist = {};
    if (req.query.sortby == "upvotes") sortby = { upvotes: -1 };
    const posts = await post.find(showBlacklist).sort(sortby);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send();
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new post({
      username: req.user.name,
      content: req.body.content,
      userid: mongoose.Types.ObjectId(req.user._id),
    });
    await newPost.save();
    res.status(201).send();
  } catch (err) {
    res.status(500).send();
  }
};

const updatePost = async (req, res) => {
  try {
    const change = { blacklist: true };
    if (!req.body.blacklist) change.blacklist = false;
    await post.findByIdAndUpdate(req.body.post_id, change);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
};

const deletePost = async (req, res) => {
  try {
    await post.findByIdAndDelete(req.body.post_id);
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
};
module.exports = { getAllPost, createPost, updatePost, deletePost };
