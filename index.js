const express = require("express");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoutes");
const logger=require("./config/logger")
const app = express();
app.use(express.json());
require("dotenv").config();
const cookieParser = require("cookie-parser");
require("./config/database").connect();
const helmet = require("helmet");
// const Logger = require("./middleware/logger");

const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(authRouter);
app.use(userRouter);
app.use(helmet());
app.use((req,res,next)=>{
  console.log(req.originalUrl);
  next()
})
// Logger()

app.get("/", (req, res) => {
  res.send("ok");
});
app.listen(PORT, () => {
  // logger.log("info","yes")
  console.log(`Server running at http://localhost:${PORT}`);
});
