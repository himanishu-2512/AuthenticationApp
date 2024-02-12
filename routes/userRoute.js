const router = require("express").Router();
const {
  getDetails,
  getAll,
} = require("../controller/userController");
const auth = require("../middleware/auth");
const isAdmin=require("../middleware/isAdmin")

//normal route
router.get("/userdetail", auth, getDetails);
//admin route can by aaccesssed by only admin
router.get("/users", auth, isAdmin, getAll);

module.exports = router;
