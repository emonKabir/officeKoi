'use strict'
const User = require("../models/User");

exports.Registration = function (req, res) {
  req.body.user_photo = req.file.filename;
  let user = new User(req.body);

  user
    .registration()
    .then(function (newUser) {
      res.send(newUser);
    })
    .catch(function (err) {
      console.log(err);
    });
};

exports.login = function (req, res) {
  console.log("token: " + req.body.token);
  let user = new User(req.body);
  user
    .login()
    .then((data) => {
      console.log(data.refreshToken);
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.editProfile = function (req, res) {
  if(!req.file){
    console.log("edit profile has image : "+req.file.filename)
    req.body.user_photo  = req.file.filename;
  }
  let user = new User(req.body, req.params.id);
  user
    .editProfile()
    .then((num) => res.status(400).send("Successfully updated"))
    .catch((err) => res.send("try again"));
};

exports.getProfileInfo = function(req,res){
  User.getProfileInfo(req.params.id).then(userInfo=>res.send(userInfo)).catch(err=>res.send(err))
}


