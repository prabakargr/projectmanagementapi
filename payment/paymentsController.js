var Payment=require('./paymentModel');

var jwt    = require('jsonwebtoken');

var express     = require('express');

var app         = express();

var config = require('../config');

app.set('superSecret', config.secret);


//add new payment
var addpayment=function(req,res){
  var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            // if everything is good, save to request for use in other routes
            // req.decoded = decoded;    
            // next();
            var client=req.body.client;
    var appname=req.body.appname;  
    Payment.findOne({client,appname},function(err,payment){
      // console.log(payment);
      // var paying=this.payment;
      if(err){
        res.status(404)
        res.send('not found')
    }else{
      // console.log(payment);
      // payment.paidamt=req.body.paidamt;
      payment.addpayment.push(req.body.addpayment);
      console.log(payment.addpayment)
      payment.save(function(err){
        if(!err){
          res.status(200);
          res.send(payment);
        }else{
          res.status(500);
          res.send('not found');
        }
      })
    } 
    })
          }
        });
    
      } else {
    
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

 
    };
    
}

//for pending amt calculation

var findProject=function(req,res){
  var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            // if everything is good, save to request for use in other routes
            // req.decoded = decoded;    
            // next();
            var client=req.body.client;
  var appname=req.body.appname;
  Payment.findOne({client,appname},function(err,payment){
     res.send(payment);
  })
          }
        });
    
      } else {
    
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

 
    };
 
}

// to get clients

var getClients=function(req,res){
  var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            // if everything is good, save to request for use in other routes
            // req.decoded = decoded;    
            // next();
            var client=req.body.client;
    var appname=req.body.appname;  
    Payment.findOne({client,appname},function(err,payment){
      // console.log(payment);
      // var paying=this.payment;
      if(err){
        res.status(404)
        res.send('not found')
    }else{
      // console.log(payment);
      // payment.paidamt=req.body.paidamt;
      Payment.find(function(err,clients){
        if(err){
          res.send('cannot add');
        }else{
          res.send(clients);
        }
      })
    } 
    })
          }
        });
    
      } else {
    
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

 
    };
 
}
module.exports={
addpayment:addpayment,
findProject:findProject,
getClients:getClients
}

