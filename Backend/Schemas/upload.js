let mongoose=require('mongoose');
let userDetail = require("../Schemas/mongoSchema");
const { string } = require('prop-types');
let userSchema = new mongoose.Schema({

    title:{type:String,required:true},
    category:{type:String,required:true},
    username:{type:String,required:true},
    filename:{type:String,required:true},
    date:{type:String},
    time:{type:String},
    like:{type:Number},
    likedby:Array,
    comment:{type:Number},
    commentby:Array,
    commentdata:Array,
    
    userGet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "empinfo"
     },

},{versionKey:false});

let userTwo=mongoose.model('filesdetail',userSchema);
module.exports=userTwo;