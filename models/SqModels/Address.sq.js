module.exports = (db, dataTypes) => {
    const Address = db.define("address", {
      house_no: {
        type: dataTypes.STRING
      },
      road_no: {
        type: dataTypes.STRING
      },
      city:{
          type: dataTypes.STRING
      },
      flat:{
          type: dataTypes.STRING
      }
     
    });
    return Address;
  };