const express = require("express");
const bodyParser = require("body-parser");
//const fileUpload = require('express-fileupload')
const app = express();
//app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/image',express.static(__dirname + '/public/assets/img/user_images'));

app.use('/api',require('./api-router'))


//app.use(express.static("public"))
app.set("views", "views")
app.set("view engine", "ejs")

const db = require("./models/index");
db.sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});