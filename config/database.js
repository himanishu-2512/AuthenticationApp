require('dotenv').config();
const mongoose = require('mongoose');



exports.connect=()=>{
mongoose.connect(process.env.MONGO_URL)
.then(console.log("DB connected sucesfully"))
.catch((error)=>{(console.log(error))
  process.exit(1);})
}