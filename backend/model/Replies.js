import mongoose from "mongoose";

const r_schema=new mongoose.Schema({
    content:{
        type:String,
        required:"true",
        validate(data)
        {
            if(data.match(/(?i)(fuck|sex|porn|dick|cock|cunt|pussy|asshole)/))
                throw new Error("Abusive Language detected");
        }
    },
    upvotes:{
        type:Array,
        default:[]
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    blacklist:{
        type:Boolean,
        default:false
    }
},{timestamps:true});


const reply=mongoose.model('reply',r_schema);

export {reply};