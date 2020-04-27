module.exports = (db, dataTypes) => {
    const Image = db.define("image", {
      image: {
        type: dataTypes.STRING
      }
    });
    return Image;
  };