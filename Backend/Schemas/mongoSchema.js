let mongoose=require('mongoose');
let userSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
},{versionKey:false});

let user=mongoose.model('empinfo',userSchema);
module.exports=user;