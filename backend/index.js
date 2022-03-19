const mongoose=require("mongoose");
const express=require("express");
const p_router=require("./routes/p_router.js");
const port=process.env.port || 3000; 
const username=encodeURIComponent("backend");
const password=encodeURIComponent("none");
const dburl=`mongodb://${username}:${password}@127.0.0.1:5000/gc-st2`;
mongoose.connect(dburl);

const app=express();
app.use(express.json());
app.use(p_router);
//app.use(r_router);

app.listen(port);
