const transport = require("../config/mailer");
require("dotenv").config()

const sendMail = async (email, subject, message) => {
  try {
    const transporter = transport();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    });
    console.log("sucessfuly sent mail to your registered email address");
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendMail;