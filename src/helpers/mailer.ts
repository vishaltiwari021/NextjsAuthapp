import nodemailer from "nodemailer";
import User from "@/models/userModels.js";
import bcrypt from "bcryptjs";

export const sendEmail = async({email, emailType,userId}:any) =>{
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

       if(emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId,
            {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
                
            }
        )
       }else if(emailType === "FORGOT_PASSWORD"){
         await User.findByIdAndUpdate(userId,
            {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
                
            }
        )
       }
    var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3a17bb01ab16bc",
    pass: "0a1c8592100b74"
  }
});

       const mailOptions ={
        from: "xyz@domain.com",
        to:email,
        subject : emailType === "VERIFY" ? "Verify Your Account" : "Reset Your Password",
        html:`
            <p>Click the link below to ${emailType === "VERIFY" ? "verify your account" : "reset your password"}:0 </p>
            <a href="${process.env.domain}/verifyEmail?token=${hashedToken}">Click Here</a>        
        `
       }

       const mailResponse = await transport.sendMail(mailOptions);
       return mailResponse;

    } catch (error:any) {
    throw new Error(error.message);
    }
}