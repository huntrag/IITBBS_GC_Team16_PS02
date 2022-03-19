import mongoose from "mongoose";

const u_schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"view"
    },
    blacklist:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
        default:""
    },
    tokens:{
        type:Array,
        default:[]
    }
});

const user=mongoose.model('user',u_schema);

export {user};