const mongoose=require("mongoose");

const r_schema = new mongoose.Schema(
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
    postid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userid:{
      type:mongoose.Schema.Types.ObjectId,
      required:true
  },
    username:{
      type:String,
      required:true
    },
    downvotes: {
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

module.exports=reply;
