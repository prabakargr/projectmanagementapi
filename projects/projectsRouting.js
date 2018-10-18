var express=require('express');

var projectsController=require('./projectsController');

var projectsRouting=express.Router();

projectsRouting.route('/addproject').post(projectsController.addProject);
projectsRouting.route('/getprojects').get(projectsController.getProjects);
projectsRouting.route('/projectupdate').post(projectsController.updateProject);
projectsRouting.route('/deleteproject').post(projectsController.deleteProject);
projectsRouting.route('/findproject').post(projectsController.findProject);
projectsRouting.route('/editproject/:_id').post(projectsController.editproject);
projectsRouting.route('/addpayment').post(projectsController.addpayment);
projectsRouting.route('/findProjectForPayment').post(projectsController.findProjectForPayment);

module.exports=projectsRouting;