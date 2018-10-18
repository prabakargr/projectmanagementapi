var express=require('express');

var paymentsController=require('./paymentsController');

var paymentsRounting=express.Router();

paymentsRounting.route('/addpayment').post(paymentsController.addpayment);
paymentsRounting.route('/findProject').post(paymentsController.findProject);
paymentsRounting.route('/getclients').get(paymentsController.getClients);



module.exports=paymentsRounting;