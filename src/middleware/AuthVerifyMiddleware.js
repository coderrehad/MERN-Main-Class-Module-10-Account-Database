const jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    try{
        let token = req.headers['token'];
        await jwt.verify(token, "Key123456", function (error, decoded) {
            if(!error){
                let email = decoded['data'];
                let result = req.headers.email = email;
                next()

            }else {
                res.status(200).json({
                    status: "Unauthorized"
                })
            }
        })
    }catch (e) {
        res.status(200).json({
            status: "fail",
            data: e.toString()
        })
    }
}