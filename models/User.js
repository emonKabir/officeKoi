
const validator = require("validator");
const bcrypt = require("bcryptjs");
const db = require("./index");
const dbUser = db.user;
const dbLocation = db.location;
const dbAddress = db.address;
const dbHost = db.host;
const dbImage = db.image;
const dbOfficeSpace = db.officeSpace;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const TokenHelper = require("./HelperModels/TokenHelper");
const privateKey = fs.readFileSync("./private.key", "utf8");
const publicKey = fs.readFileSync("./public.key", "utf8");

let User = function (data, requestedId) {
  this.data = data;
  this.requestedId = requestedId;
  this.errors = [];
};

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
    try {
      if (!this.errors.length) {
        let salt = bcrypt.genSaltSync(10);
        this.data.password = bcrypt.hashSync(this.data.password, salt);
        const user = await dbUser.create(this.data);
        const userId = user.id;
        await dbLocation.create({
          userId: userId,
          latitude: this.data.latitude,
          longtitude: this.data.longtitude,
        });
        await dbAddress.create({
          userId: userId,
          house_no: this.data.house_no,
          road_no: this.data.road_no,
          city: this.data.city,
          flat: this.data.flat,
        });
        resolve(user);
      } else {
        reject(this.errors);
      }
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    console.log("User id : " + this.data.id);
    dbUser
      .findByPk(this.data.id)
      .then((currentUser) => {
        console.log(currentUser.password);
        if (bcrypt.compareSync(this.data.password, currentUser.password)) {
          console.log("Password match");
          let _id = currentUser.id;
          let tokenHelper = new TokenHelper(_id.toString());
          const newToken = jwt.sign(
            { id: _id },
            privateKey,
            tokenHelper.signOptions()
          );
          const refreshToken = jwt.sign(
            { id: _id },
            privateKey,
            tokenHelper.refreshTokensignOptions()
          );
          currentUser.dataValues.token = newToken;
          currentUser.dataValues.refreshToken = refreshToken;
          console.log(currentUser.dataValues);
          resolve(currentUser);
        } else {
          reject("invalid User name or password");
        }
      })
      .catch((err) => {
        reject("suddenly coming here");
      });
  });
};

User.prototype.editProfile = function () {
  return new Promise((resolve, reject) => {
    dbUser
      .update(this.data, { where: { id: this.requestedId } })
      .then((num) => resolve())
      .catch((err) => reject());
  });
};

User.getProfileInfo = function(id){
return new Promise(async function (resolve,reject){
  try {
    let userLocation = await dbLocation.findAll({where:{userId:id}})
    //console.log(userLocation[0].latitude)
  let userInfo = await dbUser.findByPk(id)
   //console.log(userInfo)
  let userAddress = await dbAddress.findAll({where:{userId:id}})
     const userInformation = {

        first_name:userInfo.first_name,
        last_name: userInfo.last_name,
        phone_number:userInfo.phone_number,
        email:userInfo.email,
        user_type: userInfo.user_type,
        latitude:userLocation[0].latitude,
        longtitude:userLocation[0].longtitude,
        house_no:userAddress[0].house_no,
        road_no:userAddress[0].road_no,
        city:userAddress[0].city,
        flat: userAddress[0].flat
    } 
   console.log(userInformation)
    //resolve(userInformation)
    resolve(userInformation)
  } catch (error) {
    reject(error)
    console.log(error)
  }
})
}

module.exports = User;
