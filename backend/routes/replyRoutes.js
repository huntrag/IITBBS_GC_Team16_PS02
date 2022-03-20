<<<<<<< HEAD
const express = require('express');
const post = require('../model/Posts');
const router = new express.Router();
const mongoose = require('mongoose');
const {
  getAllPost,
  createPost,
  toggleBlackListPost,
  deletePost,
} = require('../controller/postController');
const { ensureAuth } = require('../middleware/auth');

router.get('/', getAllPost);

router.post('/', ensureAuth, createPost);

router.patch('/blackList', ensureAuth, toggleBlackListPost);

router.delete('/:postId', ensureAuth, deletePost);

module.exports = router;
=======
const express = require("express");
const reply = require("../model/Replies");
const router = new express.Router();
const mongoose = require("mongoose");
const {
  getReplies,
  createReply,
  toggleBlackListReply,
  deleteReply,
} = require("../controller/replyController");
const { ensureAuth, isAdmin } = require("../middleware/auth");

router.get("/" ,getReplies);

router.post("/",ensureAuth ,createReply);

router.patch("/blacklist",ensureAuth, isAdmin,toggleBlackListReply);

router.delete("/:replyId",ensureAuth ,deleteReply);
module.exports = router;
>>>>>>> e40b6d4be88ac822b4fa7132a75031340b130273
