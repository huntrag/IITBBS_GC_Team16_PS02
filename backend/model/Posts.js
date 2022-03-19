import mongoose from "mongoose";

const post_schema=new mongoose.Schema({
    content:{
        type:String,
        required:"true",
        validate(data)
        {
            if(data.match(/(?i)(fuck|sex|porn|ass|dick|cock|pussy)/))
                throw new Error("Abusive Language detected");
        }
    },
    upVotes:{
        type:Array,
        default:[]
    },
    downVotes:{
        type:Array,
        default:[]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    blackList:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

post_schema.pre('remove',async function(next)
{
    //delete all replies before deleting task 
    next();
});

const post=mongoose.model('post',post_schema);

export {post};