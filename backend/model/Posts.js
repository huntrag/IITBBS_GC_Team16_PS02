const mongoose = require("mongoose");
const reply = require("./Replies");
const post_schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: "true",
      validate(data) {
        if (data.match(/(fuck|sex|porn|dick|cock|cunt|pussy|asshole)/i))
          throw new Error("Abusive Language detected");
      },
    },
    upvotes: {
      type: Array,
      default: [],
    },
    downvotes: {
      type: Array,
      default: [],
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    blacklist: {
      type: Boolean,
      default: false,
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  },
  { timestamps: true }
);

post_schema.pre("remove", async function (next) {
  await reply.deleteMany({ postid: this._id });
  next();
});

const post = mongoose.model("post", post_schema);

module.exports = post;
