const express = require("express");
const reply = require("../model/Replies");
const router = new express.Router();
const mongoose = require("mongoose");
const {
  getreplies,
  createreply,
  updatereply,
  deletereply,
} = require("../controller/replyController");
const { ensureAuth } = require("../middleware/auth");

router.get("/",ensureAuth ,getreplies);

router.post("/",ensureAuth ,createreply);

router.patch("/",ensureAuth ,updatereply);

router.delete("/",ensureAuth ,deletereply);
module.exports = router;