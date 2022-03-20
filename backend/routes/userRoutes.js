const express = require("express");
const reply = require("../model/Replies");
const user = require("../model/userModel");
const post = require("../model/Posts");
const router = new express.Router();
const mongoose = require("mongoose");
const { ensureAuth, isAdmin } = require("../middleware/auth");

router.patch("/user/blacklist",ensureAuth,isAdmin,async(req,res)=>
{
    try{
        const userid=req.query.userid;
        const change={blacklist: true};
        if(!req.query.blacklist)
            change.blacklist=false;
        await user.findByIdAndUpdate(userid,change);
        res.send("OK");
    }
    catch(e){
        res.status(400).send();
    }
});

module.exports=router;