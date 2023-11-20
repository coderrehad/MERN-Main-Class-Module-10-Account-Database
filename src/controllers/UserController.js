const UserModel = require('../models/UserModel');
let jwt = require('jsonwebtoken');
const SendEmailUtility = require('../utility/SendEmailUtility');
const OTPModel = require('../models/OTPModel');


// User Registration Implement
exports.registration = async (req,res)=>{
    try{
        let reqBody = req.body;
        let result = await UserModel.create(reqBody);
        res.status(200).json({
            status: "Success",
            data: result
        })
    }
    catch (e){
        res.status(200).json({
            status: "Success",
            data: e.toString()
        })
    }
}


// User Login Implement
exports.login = async (req,res)=>{
    try{
        let reqBody = req.body;
        let result = await UserModel.find(reqBody).countDocuments();
        if(result === 1){
            //Login success

            //Token create
            let Payload = {
                exp: Math.floor(Date.now() / 1000 * (24*60*60)),
                data: reqBody['email']
            }
            let token = jwt.sign(Payload, "Key123456");
            res.status(200).json({
                status: "Success",
                data: token
            })
        }else{
            //Login fail
            res.status(200).json({
                status: "fail",
                data: "No User Found"
            })
        }
    }
    catch (e){
        res.status(200).json({
            status: "fail",
            data: e.toString()
        })
    }
}


// User Profile Details Implement
exports.profileDetails = async (req,res)=>{
    try{
        let email = req.headers['email'];
        let result = await UserModel.find({email:email});
        res.status(200).json({
            status: "Success",
            data: result
        })
    }catch (e) {
        res.status(200).json({
            status: "fail",
            data: e.toString()
        })
    }
}


// User Profile Update Implement
exports.profileUpdate = async(req,res)=>{
    try{
        let email = req.headers['email'];
        let reqBody = req.body;
        let result = await UserModel.updateOne({email: email}, reqBody);
        res.status(200).json({
            status: "Success",
            data: result
        });

    }catch (e) {
        res.status(200).json({
            status: "fail",
            data: e.toString()
        })
    }
}


//User RecoveryPass Email Implement
exports.RecoveryVerifyEmail = async (req,res)=>{
    try{
        let email = req.params.email;
        let OTPCode = Math.floor(100000 + Math.random() * 900000);

        let MailSubject = "Your Verification Code is = "+OTPCode;
        let MailText = "Task Manager MERN Verification Code";

        let result = await UserModel.find({email:email}).count();

        if(result === 1){
            // await SendEmailUtility(email, MailSubject, MailText);
            await OTPModel.create({email: email, otp:OTPCode});

            res.status(200).json({
                status: "Success",
                data: "5 digit verification code has been send"
            })
        }else{
            res.status(200).json({
                status: "fail",
                data: "No User Found"
            })
        }
    }catch (e) {
        res.status(200).json({
            status: "fail",
            data: e.toString()
        })
    }
}


//User RecoveryPass OTP Implement
exports.RecoveryVerifyOTP = async (req,res)=>{
    try{
        let email = req.params.email;
        let otp = req.params.otp;
        let Status = 0;
        let statusUpdate = 1;
        let result = await OTPModel.find({email:email, otp:otp, Status: Status}).countDocuments();
        //Time validation 2 min here

        if(result === 1){
            await OTPModel.updateOne({email:email, otp:otp, Status:Status}, {Status:statusUpdate});

            res.status(200).json({
                status: "Success",
                data: "Verification Success"
            })
        }else{
            res.status(200).json({
                status: "fail",
                data: "Verification failed"
            })
        }
    }catch (e) {
        res.status(200).json({
            status: "fail",
            data: e.toString()
        })
    }
}


//User Recovery Reset Pass Implement
exports.RecoveryResetPass = async (req,res)=>{
    try{
        let email = req.body['email'];
        let otp = req.body['otp'];
        let newPassword = req.body['password'];
        let statusUpdate = 1;

        let result = await OTPModel.find({email:email, otp:otp, Status: statusUpdate}).countDocuments();

        if(result === 1){
            await UserModel.updateOne({email:email}, {password:newPassword});
            res.status(200).json({
                status:"Success",
                data: "Password Reset Success"
            })
        }else{
            res.status(200).json({
                status:"fail",
                data: "Password Reset Unsuccessfully"
            })
        }
    }catch (e) {
        res.status(200).json({
            status:"fail",
            data: e.toString()
        })
    }
}


























