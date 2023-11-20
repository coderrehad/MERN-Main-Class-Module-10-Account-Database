const mongoose = require('mongoose');

const OTPSchema = mongoose.Schema({
    email: {type: String},
    otp: {type: String},
    Status: {type: Number, default: 0}
},
    {
        timeStamp: true,
        versionKey: false
    }
)


let OTPModel = mongoose.model('otps', OTPSchema);



module.exports = OTPModel;






