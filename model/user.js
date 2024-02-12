const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  firstName: {
    type: String,
    require:true,
  },
  lastName:{
    type:String,
  },
  password: {
    type: String,
    require: true,
    min: [8, "Must be at least 8 characters, got {VALUE}"],
  },
  userRole:{
    type:String,
    enum:["user","admin"],
    default:"user",
  }

});

module.exports = mongoose.model("User", userSchema, "users");