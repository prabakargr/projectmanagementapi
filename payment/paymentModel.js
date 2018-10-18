var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var paymentModel=new Schema({
    client:String,
    appname:String,
    totalcost:String,
    pendingamt:String,
    addpayment:[{
        amount:String,
        date:String
    }]
    
});

module.exports=mongoose.model("payment",paymentModel);

