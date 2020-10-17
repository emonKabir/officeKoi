const db = require("./index");
const dbUser = db.user;
const dbLocation = db.location;
const dbAddress = db.address;
const dbHost = db.host;
const dbImage = db.image;
const dbOfficeSpace = db.officeSpace;

let OfficeSpace = function (data) {
    this.data = data
}

OfficeSpace.addOfficeSpace = function (body, files) {
    return new Promise(async (resolve, reject) => {
        try {
            let host = await dbHost.create(body);
            let host_id = host.id;
            body.hostId = host_id;
            const officeSpace = await dbOfficeSpace.create(body);
            const officeSpaceId = officeSpace.id;
            let images = []
            files.forEach(function (file) {
                images.push({ officeSpaceId: officeSpaceId, image: file.filename })
            })
            console.log(images)
            await dbImage.bulkCreate(images)
            //   console.log("office space id : "+officeSpaceId)
            // console.log(files)
            resolve("resolved")
        } catch (error) {
            reject("office space function in user model : " + error)
        }

    })
}
OfficeSpace.getSpace = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const spaces = await dbOfficeSpace.findAll()
            resolve(spaces)
            //  console.log("office space "+spaces.officeSpace.dataValues)
        } catch (error) {
            reject("kasala")
        }
    })
}

module.exports = OfficeSpace;
