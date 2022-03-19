import mongoose from "mongoose";

const r_schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: "true",
      validate(data) {
        if (data.match(/(?i)(fuck|sex|porn|dick|cock|cunt|pussy|asshole)/))
          throw new Error("Abusive Language detected");
      },
    },
    upVotes: {
      type: Array,
      default: [],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    downVotes: {
      type: Array,
      default: [],
    },
    blackList: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const reply = mongoose.model("reply", r_schema);

export { reply };
