var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var userModel=new Schema({
    username:String,
    email:String,
    password:String,
    role:String,
    fname:String,
    lname:String,
    city:String,
    postal:String,
    aboutme:String,
    address:String,
    country:String

});



module.exports=mongoose.model("alluser",userModel);