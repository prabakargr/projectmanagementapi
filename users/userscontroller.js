var User=require('./userModel');

var express     = require('express');

var app         = express();

var jwt    = require('jsonwebtoken');

var config = require('../config');

app.set('superSecret', config.secret);



//add user
var adduser=function (req,res) {
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
          
            var id={
                email:req.body.email,
            }
            User.findOne(id,function(err,result){
                console.log(result);
                if(result===null){
                    var user=new User(req.body);
                    user.save(function (err) {
                        if(err){
                            res.send('cannot reqister')
                        }else{
                            var data={
                                message:'User Added Successfully',
                                user:user
                            }
                            return res.send(data)
                        }
                    });
                }else if(result.email===id.email){
                    var data={
                        message:'Existing user'
                    }
                    return res.send(data)
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

//get users
var getusers=function(req,res){
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
           User.find(function(err,users){
    console.log(users)
    res.send(users);
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

// update profile

 var updateProfile=function(req,res){
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
            var email=req.body.email;
            var username=req.body.username;
            var fname=req.body.fname;
            var lname=req.body.lname;
            var address=req.body.address;
            var city=req.body.city;
            var postal=req.body.postal;
            var aboutme=req.body.aboutme;
            var country=req.body.country
            User.findOneAndUpdate(
                {email,username},
                {
                    fname,
                    lname,
                    address,
                    city,
                    postal,
                    aboutme,
                    country
                },
                function(err,user){
                    
                if(err){
                    res.status(404).send('connot update');
                }else{
                    res.status(200).send(user);
                }
                }
               )
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


// forgot password

var forgotpwd=function(req,res){
    var email={
        email:req.body.email
    }
    console.log(email)
    User.find(email,function (err,user) {

        if(err){

            res.send('err')
        }else {
            res.send(user);
            console.log(user);
        }
    });
};

// change password (patch) method

var changepwd = function(req, res){
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
            var email = req.body.email;
            var confirmPassword = req.body.confirmPassword;
            var currentpass=req.body.currentpass;
            User.findOne({email},function(err, user){
                if(err){
                    res.status(404).send('No user found')
                }else{
                    if(user.password==currentpass){
                        user.password=confirmPassword;
                        user.save(function(err,user){
                            if(err){
                                res.send('Update failed')
                            }else{
                                res.send(user)
                            }
                        })
                    }else{
                        res.send('current password is wrongs')
                    }
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


  // login with authendication
  var login=function(req,res){
      

    // find the user
    User.findOne({
        email: req.body.email
      }, function(err, user) {
    
        if (err) throw err;
    
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
    
          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
    
            // if user is found and password is right
            // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          id:user.id,
          email:user.email,
          username:user.username,  
          role: user.role 
        };
        console.log(payload);
            var token = jwt.sign(payload, app.get('superSecret'),{
            // expiresIn: 1440 // expires in 24 hours
           
            });
            console.log(token);
            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token,
              user:user
            }).status(200);
          }   
    
        }
    
      });
  }

var findCurrUser=function(req,res){
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
            var id={
                _id:req.body._id
            }

            User.findOne(id,function (err,user) {

                if(err){
                    res.send('cannot')
                }else {
                    res.send(user);
                    console.log(user);
                }
            });
            
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
    getusers:getusers,
    adduser:adduser,
    updateProfile:updateProfile,
    forgotpwd:forgotpwd,
    login:login,
    changepwd:changepwd,
    findCurrUser:findCurrUser
}