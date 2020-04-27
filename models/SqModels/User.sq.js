module.exports = (db, dataTypes) => {
    const User = db.define("user", {
      first_name: {
        type: dataTypes.STRING
      },
      last_name: {
        type: dataTypes.STRING
      },
      phone_number:{
        type: dataTypes.STRING
      },
      email: {
        type: dataTypes.STRING
      },
      password: {
        type: dataTypes.STRING
      },
      user_type : {
        type: dataTypes.STRING
      },
      user_photo : {
        type: dataTypes.STRING
      },
      status: {
        type: dataTypes.STRING
      }
    });
  //User.hasMany(Model.Post)
    return User;
  };