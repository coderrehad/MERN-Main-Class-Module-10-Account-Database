const nodemailer = require('nodemailer');

const SendEmailUtility = async (MailTo, MailText, MailSubject)=>{
    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            Pass: '~sR4[bhaC[Qs'
        },
        tls:{
            rejectUnauthorized: false
        }
    })

    let mailOptions= {
        from: 'Task Manager MERN <info@teamrabbil.com>',
        To: MailTo,
        Subject: MailSubject,
        Text: MailText
    }

    return transporter.sendMail(mailOptions);
}


module.exports = SendEmailUtility;











