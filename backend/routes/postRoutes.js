const express = require("express");
const post = require("../model/Posts");
const router = new express.Router();
const mongoose = require("mongoose");
const {
  getAllPost,
  createPost,
  toggleBlackListPost,
  deletePost,
  getOnePost,
} = require("../controller/postController");
const { ensureAuth, isAdmin } = require("../middleware/auth");

router.get("/", getAllPost);
router.get("/currentPost/:postId", getOnePost);

router.post("/", ensureAuth, createPost);

router.patch("/blackList", ensureAuth,isAdmin, toggleBlackListPost);

router.delete("/:postId", ensureAuth, deletePost);
module.exports = router;
