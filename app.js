const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')


const app = express();
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api',require('./api-router'))
/*
var corsOptions = {
  origin: "http://localhost:8081"
};
*/

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
/*
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
*/
app.use("/",require("./router"))

app.use(express.static("public"))
app.set("views", "views")
app.set("view engine", "ejs")

const db = require("./models/index");
db.sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});