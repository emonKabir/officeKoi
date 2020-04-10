const router = require("express").Router();
const userController = require("./Controllers/userController");
const fs = require('fs')
const jwt = require("jsonwebtoken")
const cors = require("cors");
const db = require("./models/index");
const dbUser = db.user;
const privateKey = fs.readFileSync('./private.key','utf8')
const publicKey = fs.readFileSync('./public.key','utf8')
router.use(cors());

router.post('/profile/registration',userController.apiRegistration)
router.post('/proile/login',userController.login)
router.post('/profile/testing',tokenValidation,function(req,res){
  res.send(req.body)
})


function tokenValidation(req, res, next){
  const token = req.body.token;

  if (!token) {
    return res.status(401).end();
  }

  //  let payload
  var i  = 'Mysoft corp';          // Issuer 
  var s  = 'some@user.com';        // Subject 
  var a  = 'http://mysoftcorp.in'; // Audience
  var verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "1m",
    algorithm:  ["RS256"]
   };
   var signOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "1m",
    algorithm:  "RS256"
   };
  jwt.verify(token, publicKey, verifyOptions, function (err, decode) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log("Token expried!!");
      
      const newToken = jwt.sign(
        { id: req.body.id },
        privateKey,
       signOptions
      );
      dbUser
        .update({ token: newToken }, { where: { id: req.body.id } })
        .then((num) => {
          if (num == 1) {
            console.log("Successfully updated!!!");
          } else {
            console.log("Problem with updating");
          }
        })
        .catch((err) => res.status(500).send("Problem with token updating!!!"));
      req.body.token = newToken;
      req.auth = newToken;
      next()
    } else if (err instanceof jwt.JsonWebTokenError) {
      console.log("json web token error : "+err.message);
      res.status(401).end();
    } else if(decode) {
      console.log(decode.phone_number);
      next()
    }
  });
}
module.exports = router;