const User = require("../models/User");


exports.home = function(req,res){
    res.render("home")
}

exports.apiRegistration = function(req,res){
  let file = req.files.image
   file.name = `${req.body.email}.jpg`
 let uploadpath = "public/assets/img/user_images/" + file.name;
 
 file.mv(uploadpath, function (err) {
  if (err) {
    this.errors.push({msg: "give a valid name"})
    reject()
    return
  }
});
req.body.user_photo = file.name
let user = new User(req.body)
  
  user.registration().then(function(newUser){

    res.send(newUser)
  }).catch(function(err){
    
  })
  

 console.log(file)
}

/*
exports.create = function(req, res) {
  User.create()
    .then(function(data) {
      res.send(`Okay data post successfully : ${data}`);
    })
    .catch(function(err) {
      res.send(`Error occured : ${err}`);

    });
};
*/

exports.registration = function(req,res){
    let user = new User(req.body)
    console.log("this is running : "+req.body.name)
    user.registration().then((data)=>{
        console.log("this is running 2")
        res.send("Successfully create user : "+data)
    }).catch((err)=>{
        res.send(err)
    })
}

exports.login = function(req,res){

    let user = new User(req.body)
    user.login().then((data)=>{res.send(data)}).catch((err)=>{res.send(err)})
}
