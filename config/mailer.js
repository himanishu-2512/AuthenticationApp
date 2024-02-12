require("dotenv").config()
const nodemailer = require("nodemailer");

const transport=()=>{
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        proxy:process.env.BASEURL,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
}
module.exports=transport