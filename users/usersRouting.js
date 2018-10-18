var express=require('express');

var usersController=require('./userscontroller');

var usersRouting=express.Router();

usersRouting.route('/getusers').get(usersController.getusers);
usersRouting.route('/adduser').post(usersController.adduser);
usersRouting.route('/updateprofile').post(usersController.updateProfile);
usersRouting.route('/forgotpwd').post(usersController.forgotpwd);
usersRouting.route('/login').post(usersController.login);
usersRouting.route('/changepwd').post(usersController.changepwd);
usersRouting.route('/findCurrUser').post(usersController.findCurrUser);


module.exports=usersRouting;