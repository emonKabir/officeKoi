const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./SqModels/User.sq")(sequelize, Sequelize);
db.location = require('./SqModels/Location.sq')(sequelize, Sequelize);
db.address = require("./SqModels/Address.sq")(sequelize,Sequelize);
db.host = require('./SqModels/Host.sq')(sequelize,Sequelize);
db.officeSpace = require('./SqModels/OfficeSpace.sq')(sequelize,Sequelize);
db.image = require('./SqModels/Image.sq')(sequelize,Sequelize);

//creating relationshiop between tables
//db.user.hasMany(db.post)
//db.post.belongsTo(db.user)
db.user.hasMany(db.location)
db.location.belongsTo(db.user)

db.user.hasMany(db.address)
db.address.belongsTo(db.user)

db.host.hasMany(db.officeSpace)
db.officeSpace.belongsTo(db.host)

db.officeSpace.hasMany(db.image)
db.image.belongsTo(db.officeSpace)

module.exports = db;