const express = require("express");
const post = require("../model/Posts");
const router = new express.Router();
const mongoose = require("mongoose");
const {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/postController");
const { ensureAuth } = require("../middleware/auth");

router.get("/",ensureAuth ,getAllPost);

router.post("/", createPost);

router.patch("/", updatePost);

router.delete("/", deletePost);
module.exports = router;
