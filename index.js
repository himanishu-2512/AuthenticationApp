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
const Logger = require("./middleware/logger");

const PORT = process.env.PORT || 8000;
app.use(require('sanitize').middleware);
app.use(cookieParser());
app.use(helmet());
app.use(Logger);
app.use(authRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("ok");
});
app.listen(PORT, () => {

  console.log(`Server running at http://localhost:${PORT}`);
});
