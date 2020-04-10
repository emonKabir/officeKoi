const router = require("express").Router();
const userController = require("./Controllers/userController");
const cors = require("cors");

router.use(cors());
router.get("/",userController.home)
//router.post("/create", userController.create);
//user related router
router.post("/registration",userController.registration)
router.post("/login",userController.login)
module.exports = router;
