var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var projectModel=new Schema({
    slno: String,
    appname: String,
    client: String,
    appstatus: String,
    totalcost: String,
    comment: String,
    date: String,
    timelimit:String,
    startdate: String,
    enddate:String,
    description:String,
    paymentstatus:String,
    addpayment:[{
        amount:String,
        date:String
    }]
});

module.exports=mongoose.model("project",projectModel);