const AbstractManager = require("./AbstractManager");

class StreetArtManager extends AbstractManager {
  constructor() {
    super({ table: "street_art" });
  }

  insert(streetArt) {
    return this.database.query(
      `insert into ${this.table} (name, image, longitude, latitude, is_valid, score, id_artist) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        streetArt.name,
        streetArt.image,
        streetArt.longitude,
        streetArt.latitude,
        streetArt.isValid,
        streetArt.score,
        streetArt.id_artist,
      ]
    );
  }

  update(streetArt) {
    return this.database.query(
      `update ${this.table} set name = ?, image = ?, longitude= ?, latitude= ?, is_valid= ?, score= ?, id_artist= ? where id = ?`,
      [
        streetArt.name,
        streetArt.image,
        streetArt.longitude,
        streetArt.latitude,
        streetArt.isValid,
        streetArt.score,
        streetArt.id_artist,
        streetArt.id,
      ]
    );
  }

  checkLocation(location) {
    const errorGape = 0.00022;
    return this.database.query(
      `select id from  ${this.table} where (longitude BETWEEN ? AND ?) AND (latitude BETWEEN ? AND ?)`,
      [
        parseFloat(location.x, 10) - errorGape,
        parseFloat(location.x, 10) + errorGape,
        parseFloat(location.y, 10) - errorGape,
        parseFloat(location.y, 10) + errorGape,
      ]
    );
  }
}

module.exports = StreetArtManager;
