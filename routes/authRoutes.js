const router = require("express").Router();
const {
  login,
  register,
  forgotpassword,
  verifyToken
} = require("../controller/authController");
const Logger = require("../middleware/logger");


router.post("/login",Logger, login);
router.post("/register", register);
router.post("/forgotpassword",forgotpassword)
router.post("/verifytoken",verifyToken)


module.exports = router;
