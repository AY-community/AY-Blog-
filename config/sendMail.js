const nodemailer = require("nodemailer"); 

//SEND EMAIL
const transporter = nodemailer.createTransport(
    {
        secure:true,
        host: "smtp.gmail.com",
        port: "465",
        auth:{
            user:process.env.MAIN_EMAIL_APP,
            pass:process.env.APP_NODEMAILER_PASS
        }
    }
)

const sendMail  =  (to , sub , msg) => {

     transporter.sendMail({ 
    from: `"AY Blog App" <${process.env.MAIN_EMAIL_APP}>`,
    to:to,
    subject:sub,
    html:msg
}
) 
} 

module.exports = sendMail