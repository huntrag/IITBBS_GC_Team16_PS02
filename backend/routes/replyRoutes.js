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
