import express from 'express';
import mongoose from 'mongoose';

const port=process.env.port || 3000;

const app=express();
app.use(express.json());

const user=encodeURIComponent("api");
const password=encodeURIComponent("noneatall");
const dburl=`mongodb://${user}:${password}@127.0.0.1:${port}/gc22`;
mongoose.connect(dburl);

app.use(post_routes);
app.use(reply_routes);
app.use(user_routes);

app.listen(port,(p)=>console.log(`App runs on port:${p}\n`));
