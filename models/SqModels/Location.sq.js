module.exports = (db, dataTypes) => {
    const Location = db.define("location", {
      latitude: {
        type: dataTypes.STRING
      },
      longtitude: {
        type: dataTypes.STRING
      }
     
    });
    return Location;
  };