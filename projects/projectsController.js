var Project = require('./projectModel');

var Payment = require('../payment/paymentModel')

var jwt = require('jsonwebtoken');

var express = require('express');

var app = express();

var config = require('../config');

app.set('superSecret', config.secret);
// add new project

var addProject = function (req, res) {
    var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;    
                // next();
                var new_project = new Project(req.body);
                new_project.save(function (err,result) {
                    if (err) {
                        res.send('error');
                    } else {
                        res.send(result)
                        // var payment = new Payment(req.body);
                        // payment.save(function (err) {
                        //     if (err) {
                        //         res.send('error');
                        //     } else {
                        //         res.send(payment);
                        //     }
                        // })
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

};

// projects and details get

var getProjects = function (req, res) {
    var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;    
                // next();
                Project.find(function (err, projects) {
                    if (err) {
                        res.status(500);
                        res.send('sever err')
                    } else {
                        res.status(200);
                        res.send(projects)
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
};

//project update

var updateProject = function (req, res) {
    var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;    
                // next();
                var _id = req.body._id
                var appname = req.body.appname;
                var client = req.body.client;
                var appstatus = req.body.appstatus;
                var comment = req.body.comment;
                var date = req.body.date;
                Project.findByIdAndUpdate({ _id },
                    { date, appstatus, comment },
                    function (err, project) {
                        if (err) {
                            res.status(404).send('connot update')
                        } else {
                            res.status(200).send(project)
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
    // Project.find(function (err, projects) {
    //     if (err) {
    //         res.status(500);
    //         res.send('sever err')
    //     } else {
    //         res.status(200);
    //         res.send(projects)
    //     }
    // });

}

//edit project

var editproject = function (req, res) {
    var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;    
                // next();
                var _id =req.params._id
                var appstatus = req.body.appstatus;
                var timelimit = req.body.timelimit;
                var totalcost = req.body.totalcost;
                var startdate = req.body.startdate;
                var description = req.body.description;
                var enddate = req.body.enddate
                Project.findByIdAndUpdate( {_id},
                        { appstatus, timelimit, totalcost, description, startdate, enddate },
                    function (err, project) {
                        console.log(_id);
                        console.log(project)
                        if (err) {
                            res.status(404).send('connot update')
                        } else {
                            res.status(200).send(project);
                            // Payment.findOneAndUpdate({ appname, client },
                            //     { totalcost },
                            //     function (err, result) {
                            //         console.log(result)
                            //         // if (err) {
                            //         //     res.status(404).send('connot update')
                            //         // } else {
                            //         //     res.status(200).send('project updated')
                            //         // }
                            //     })
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
    // Project.find(function (err, projects) {
    //     if (err) {
    //         res.status(500);
    //         res.send('sever err')
    //     } else {
    //         res.status(200);
    //         res.send(projects)
    //     }
    // });

}

//delete project

var deleteProject = function (req, res) {
    var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;    
                // next();
                // var appname = req.body.appname;
                // var client = req.body.client;
                var _id = req.body._id
                Project.findByIdAndRemove({ _id }, function (err, project) {
                    console.log(project);
                    if(err){
                        res.status(400).send('cannot remove')
                    }else{
                        res.send('Project Deleted')
                    }
                    // Project.remove(project, function (err) {
                    //     if (!err) {
                    //         Payment.findOne({ appname, client }, function (err, project) {
                    //             Payment.remove(project, function (err) {
                    //                 if (!err) {
                    //                     res.send('deleted')
                    //                 } else {
                    //                     res.send('cannot delete')
                    //                 }
                    //             })
                    //         })
                    //     } else {
                    //         res.send("cant")
                    //     }
                    // })
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

var findProject = function (req, res) {
    var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;    
                // next();
                var date = req.body.date;
                Project.find({ date }, function (err, projects) {
                    if (err) {
                        res.send('cannot find')
                    } else {
                        res.send(projects);
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
             Project.findOne({client,appname},function(err,project){
        console.log(project);
        // var paying=this.payment;
        if(err){
          res.status(404)
          res.send('not found')
      }else{
        // console.log(payment);
        // payment.paidamt=req.body.paidamt;
        project.addpayment.push(req.body.addpayment);
        console.log(project.addpayment)
        project.save(function(err){
          if(!err){
            res.status(200);
            res.send(project);
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

var findProjectForPayment=function(req,res){
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
              Project.findOne({client,appname},function(err,project){
              res.send(project);
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
  
 

 

module.exports = {
    addProject: addProject,
    getProjects: getProjects,
    updateProject: updateProject,
    deleteProject: deleteProject,
    findProject: findProject,
    editproject: editproject,
    addpayment:addpayment,
    findProjectForPayment:findProjectForPayment

}