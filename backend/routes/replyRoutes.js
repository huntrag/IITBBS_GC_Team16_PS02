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

router.get("/",ensureAuth ,getReplies);

router.post("/",ensureAuth ,createReply);

router.patch("/blacklist",ensureAuth, isAdmin,toggleBlackListReply);

router.delete("/:postId",ensureAuth ,deleteReply);
module.exports = router;