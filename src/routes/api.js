const express = require('express');
const UserController = require('../controllers/UserController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const TaskController = require('../controllers/TaskController');


const router = express.Router();

//User Manage
router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/profileDetails', AuthVerifyMiddleware, UserController.profileDetails);
router.post('/profileUpdate', AuthVerifyMiddleware, UserController.profileUpdate);

router.get('/RecoveryVerifyEmail/:email', UserController.RecoveryVerifyEmail);
router.get('/RecoveryVerifyOTP/:email/:otp', UserController.RecoveryVerifyOTP);
router.post('/RecoveryResetPass', UserController.RecoveryResetPass);

//Task Manage
router.post('/createTask',AuthVerifyMiddleware, TaskController.createTask);
router.get('/deleteTask',AuthVerifyMiddleware, TaskController.deleteTask);
router.get('/updateTaskStatus/:id/:status',AuthVerifyMiddleware, TaskController.updateTaskStatus);
router.get('/listTaskByStatus/:status',AuthVerifyMiddleware, TaskController.listTaskByStatus);
router.get('/taskStatusCount',AuthVerifyMiddleware, TaskController.taskStatusCount);


module.exports = router;
