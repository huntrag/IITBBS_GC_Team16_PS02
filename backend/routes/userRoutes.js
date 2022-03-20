const express = require("express");
const reply = require("../model/Replies");
const user = require("../model/userModel");
const post = require("../model/Posts");
const router = new express.Router();
const mongoose = require("mongoose");
const { ensureAuth, isAdmin } = require("../middleware/auth");
router.patch("/blacklist",ensureAuth,isAdmin,async(req,res)=>
{
    try{
        const userid=req.query.userid;
        const change = { blackList: !req.body.blacklist };
        await user.findByIdAndUpdate(userid,change);
        const session=await user.startSession();
        session.startTransaction();
        try{
            const transaction_option={session};
            await user.findByIdAndUpdate(userid,change,transaction_option);
            await post.updateMany({"userid":mongoose.Types.ObjectId(userid)},change,transaction_option);
            await reply.updateMany({"userid":mongoose.Types.ObjectId(userid)},change,transaction_option);
            await session.commitTransaction();
            session.endSession();
            res.send("OK");
        }
        catch(e){
            await session.abortTransaction();
            session.endSession();
            throw new Error();
        }

    }
    catch(e){
        res.status(400).send();
    }
});
module.exports=router;