const express = require('express');
const post = require('../model/Posts');
const router = new express.Router();
const mongoose = require('mongoose');
const {
  getAllPost,
  getPost,
  createPost,
  vote,
  toggleBlackListPost,
  deletePost,
} = require('../controller/postController');
const { /*ensureAuth,*/ isAdmin } = require('../middleware/auth');

router.get('/', /*ensureAuth,*/ getAllPost);

router.get('/:postId', /*ensureAuth,*/ getPost);

router.post('/', /*ensureAuth,*/ createPost);

router.patch('/blackList', /*ensureAuth, isAdmin,*/ toggleBlackListPost);

router.patch('/vote', vote);

router.delete('/:postId', /*ensureAuth,*/ deletePost);
module.exports = router;
