const postModel = require("../model/Posts");
const mongoose = require("mongoose");

const getAllPost = async (req, res) => {
  try {
    let sortby = { modifiedAt: -1 };
    let showBlacklist = { blacklist: "false" };
    if (req.session.isAdmin) showBlacklist = {};
    if (req.query.sortby == "upvotes") sortby = { upvotes: -1 };
    const posts = await postModel
      .find(showBlacklist)
      .sort(sortby)
      .populate("userid")
      .exec();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send();
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new postModel({
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

const toggleBlackListPost = async (req, res) => {
  try {
    const change = { blacklist: true };
    if (!req.body.blacklist) change.blacklist = false;
    await postModel.findByIdAndUpdate(req.body.post_id, change);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
};

const deletePost = async (req, res) => {
  try {
      const postId=req.params.postId.trim();
    const post = await postModel.findById(postId);
    if (req.user._id.toString() === post.userid.toString()) return await post.delete();
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
};
module.exports = { getAllPost, createPost, toggleBlackListPost, deletePost };
