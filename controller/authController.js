require("dotenv").config();

const bcrypt = require("bcrypt");
const User = require("../model/user");
const Token = require("../model/token");
const jwt = require("jsonwebtoken");
const generateTokens = require("../utils/generateToken");
const sendMail = require("../utils/mailer");
const {
  signUpBodyValidation,
  logInBodyValidation,
  forgotPasswordBodyValidation,
  verifyTokenBodyValidation,
} = require("../utils/validateSchema");

module.exports = {
  register: async (req, res) => {
    try {
      const { error } = signUpBodyValidation(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const { firstName, lastName, email, password } = req.body;

      const exisitingUser = await User.findOne({ email });

      if (exisitingUser) {
        return res
          .status(400)
          .json({ message: "User email is already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      if (user) {
        return res
          .status(201)
          .json({ message: "User is registered successfully" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server errror" });
    }
  },

  //login Controller
  login: async (req, res) => {
    try {
      const { error } = logInBodyValidation(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const { email, password } = req.body;
     
      const user = await User.findOne({ email });
      if (!user)return res.status(400).json({ message: "User doesn't exist" });

      const matchPassword = bcrypt.compare(password, user.password);

      if (!matchPassword)
       return res.status(401).json({ message: "Password is wrong" });
      const { refreshToken, accessToken } = await generateTokens(user);
      return res
        .cookie("refreshToken", refreshToken, { httpOnly: true })
        .json({message:"User got logged In successfully",user,accessToken});
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
  forgotpassword: async (req, res) => {
    try {
      const { error } = forgotPasswordBodyValidation(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
      await Token.deleteOne({ userId: user._id });

      const token = await Token.create({
        userId: user._id,
        token: Math.floor(Math.random() * 1000000),
      });

      const send = await sendMail(
        user.email,
        "Password Reset Request",
        `Hello, this is the token requested for password reset, the token will be valid only for 1 hour!!! 
        ${token.token}`
      );
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      return res.status(400).json({
        message: "Email doesn't sent successfully",
        error: error.message,
      });
    }
  },
  verifyToken: async (req, res) => {
    try {
      const { error } = verifyTokenBodyValidation(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const { token, email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });
      }

      const tokenCheck = await Token.findOne({ token, userId: user._id });
      if (!tokenCheck) {
        return res.status(400).json({ message: "OTP is wrong" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal sever error", error: error.message });
    }
  },
};
