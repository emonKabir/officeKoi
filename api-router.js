const router = require("express").Router();
const fs = require("fs");
const userController = require("./Controllers/userController");
const spaceController = require("./Controllers/SpaceController");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const TokenHelper = require("./models/HelperModels/TokenHelper");
const cors = require("cors");
const db = require("./models/index");
const path = require("path");
const dbUser = db.user;
const privateKey = fs.readFileSync("./private.key", "utf8");
const publicKey = fs.readFileSync("./public.key", "utf8");
router.use(cors());
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/img/user_images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.body.phone_number + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let upload = multer({ storage: storage });

router.post(
  "/profile/registration",
  upload.single("image"),
  userController.Registration
);
router.post("/profile/login", upload.none(), userController.login);
router.post(
  "/profile/:id/edit",
  upload.single("image"),
  tokenValidation,
  userController.editProfile
);
router.get("/profile/:id/info", userController.getProfileInfo);
router.post(
  "/add_office_space",
  upload.array("image", 2),
  spaceController.addOfficeSpace
);
router.get('/getOfficeSpace',spaceController.getOfficeSpace)
function tokenValidation(req, res, next) {
  const token = req.body.token;
  const refreshToken = req.body.refreshToken;

  if (!token) {
    console.log(
      "token error!!!!!!!!!!!!!!! : " +
        token +
        " refresh token: " +
        refreshToken +
        " user id : " +
        req.body.id
    );

    return res.status(401).end();
  }

  console.log("here.....................................");
  let tokenHelper = new TokenHelper(req.body.id.toString());
  jwt.verify(token, publicKey, tokenHelper.verifyOptions(), function (
    err,
    decode
  ) {
    if (err) {
      jwt.verify(
        refreshToken,
        publicKey,
        tokenHelper.refreshTokenverifyOptions(),
        function (err, decode) {
          if (err) {
            res.status(401).send("invalid user!!!");
          } else {
            console.log("refreshed token decoded : " + decode.id);
            const newToken = jwt.sign(
              { id: req.body.id },
              privateKey,
              tokenHelper.signOptions()
            );
            const refreshToken = jwt.sign(
              { id: req.body.id },
              privateKey,
              tokenHelper.refreshTokensignOptions()
            );
            req.body.token = newToken;
            req.body.refreshToken = refreshToken;
            next();
          }
        }
      );
    } else {
      console.log(
        `Decoded token : ${decode.id} and request token : ${req.body.id}`
      );
      next();
      /* if(decode.id.localeCompare(req.body.id) == 0){
          next()
        } */
    }
  });
}
module.exports = router;
