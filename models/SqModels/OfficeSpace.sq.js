module.exports = (db, dataTypes) => {
    const officeSpace = db.define("officeSpace", {
      title: {
        type: dataTypes.STRING
      },
      location: {
        type: dataTypes.STRING
      },
      address:{
          type: dataTypes.STRING
      },
      space_area:{
          type: dataTypes.STRING
      },
      rent:{
        type: dataTypes.STRING
    },
    unit:{
        type: dataTypes.STRING
    },
    advance_payment:{
        type: dataTypes.STRING
    },
    terms_n_conditions:{
        type: dataTypes.TEXT
    }
    });
    return officeSpace;
  };