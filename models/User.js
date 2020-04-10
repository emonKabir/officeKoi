const db = require("./index");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const dbUser = db.user;
const fs = require('fs')
const jwt = require('jsonwebtoken')
const privateKey = fs.readFileSync('./private.key','utf8')
const publicKey = fs.readFileSync('./public.key','utf8')
let User = function (data) {
  this.data = data;
  // this.files = files;
  this.errors = [];
};

//let file = this.files.image;
//  var uploadpath = "public/assets/img/user_images/" + file.name;

/*  
  file.mv(uploadpath, function (err) {
      if (err) {
        this.errors.push({msg: "give a valid name"})
        reject()
        return
      }
    });
    */
User.prototype.cleanUp = function () {
  this.data = {
    first_name: this.data.first_name.toLowerCase(),
    last_name: this.data.last_name.toLowerCase(),
    email: this.data.email.toLowerCase(),
    phone_number: this.data.phone_number,
    user_type: this.data.user_type.toLowerCase(),
    user_photo: this.data.user_photo.toLowerCase(),
    status: this.data.status,
    password: this.data.password,
  };
};

/*
User.prototype.validation = function(){

  return new Promise((resolve,reject)=>{

    if(this.data.name == "") {this.errors.push("Username field can't be empty")}
    if(this.data.name != "" && !validator.isAlphanumeric(this.data.name)) {this.errors.push("Usename can only contains char and number")}
    if(!validator.isEmail(this.data.email)) {this.errors.push("email field cant be empty")}
    if(this.data.password.length < 4) {this.errors.push("password must be contains 6 character")}
    resolve()
  })
}
*/

User.create = function () {
  return new Promise((resolve, reject) => {
    // Create a Tutorial
    /*
    let user = {
     name: "Emon Kabir",
     email: "emonkabir95@gmail.com",
     password:"123456"
   }*/
    dbUser
      .create(user)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        resolve(err);
      });
  });
};

User.prototype.registration = function () {
  return new Promise(async (resolve, reject) => {
    //console.log("Users body : "+body)
    // await this.validation()
    if (!this.errors.length) {
      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      const user = await dbUser.create(this.data);
      if (user) {
        resolve(user);
        console.log(user.toJson());
      } else {
        console.log("User registration goes wrong!!!");
        reject("User registration goes wrong!!!");
      }
    } else {
      reject(this.errors);
    }
  });
};

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    console.log("User id : "+this.data.id)
    dbUser
      .findByPk(this.data.id)
      .then(currentUser => {
        console.log(currentUser.password)
        if (
          
          bcrypt.compareSync(this.data.password, currentUser.password)
        ) {
          console.log("Password match")

 var i  = 'Mysoft corp';          // Issuer 
var s  = 'some@user.com';        // Subject 
var a  = 'http://mysoftcorp.in'; // Audience
// SIGNING OPTIONS
var signOptions = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "1m",
 algorithm:  "RS256"
};
          const newToken = jwt.sign({ id: currentUser.id }, privateKey, signOptions)
          currentUser.token = newToken
          //console.log(currentUser.toJson());
          resolve(currentUser);
        } else {
          reject("invalid User name or password");
        }
      })
      .catch(err => {
        reject("suddenly coming here");
      });
  });
};

module.exports = User;
