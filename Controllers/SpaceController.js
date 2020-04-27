
const OfficeSpace = require('../models/OfficeSpace')


exports.addOfficeSpace = async function(req,res){
    try {
      //let user = new User(req.body);
   const officeInfo = await OfficeSpace.addOfficeSpace(req.body,req.files)
   res.send(officeInfo)
    } catch (error) {
      res.send(error)    
    }
  }
  exports.getOfficeSpace =async function(req,res){
      try {
        const spaces = await OfficeSpace.getSpace()
        console.log(spaces)
       res.send(spaces)
      } catch (error) {
          res.send("error")
          console.log(error)
      }
  }