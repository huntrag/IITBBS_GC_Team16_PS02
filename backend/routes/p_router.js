const express=require("express");
const post=require("../model/Posts");
const router=new express.Router();
const auth=require("../middleware/auth");
const mongoose=require("mongoose");

router.get("/post",async(req,res)=>{
    let sortby={modifiedAt:-1};
    let showBlacklist={blacklist:"false"};
    if(req.query.sortby=="upvotes")
        sortby={upvotes:-1};
    //if(req.session.isAdmin)
        //showBlacklist={};
    const posts= await post.find(showBlacklist).sort(sortby);
    res.send(posts);
},(err,req,res)=>{
    res.status(500).send();
});

router.post("/post",async(req,res)=>{
    const npost=new post({
        username:req.body.name,
        content:req.body.content,
        userid:mongoose.Types.ObjectId(req.body.userid)
    });
    await npost.save().then((data)=> res.status(201).send()).catch((e)=> res.status(400).send());
},(err,req,res)=> res.status(500).send());

router.patch("/post",async(req,res)=>{
    const change={blacklist:true};
    if(!req.body.blacklist)
        change.blacklist=false;
    await post.findByIdAndUpdate(req.body.post_id,change).then((data)=>res.status(200).send()).catch((e)=>res.status(400).send());
},(err,req,res)=>{
    res.status(500).send();
});

router.delete("/post",async(req,res)=>{
    await post.findByIdAndDelete(req.body.post_id).then((d)=>res.send()).catch((e)=> res.status(400).send());
},(err,req,res)=>{
    res.status(500).send();
});
module.exports=router;
