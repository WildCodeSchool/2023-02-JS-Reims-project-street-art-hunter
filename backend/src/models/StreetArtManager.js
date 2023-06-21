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

  findAll() {
    return this.database.query(
      `select ${this.table}.*, artist.name as artistName from  ${this.table} join artist on artist.id = street_art.id_artist`
    );
  }
}

module.exports = StreetArtManager;
