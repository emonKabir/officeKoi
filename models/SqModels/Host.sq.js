module.exports = (db, dataTypes) => {
    const Host = db.define("host", {
      host_name: {
        type: dataTypes.STRING
      },
      phone_number: {
        type: dataTypes.STRING
      },
      host_email:{
          type: dataTypes.STRING
      }
     
    });
    return Host;
  };