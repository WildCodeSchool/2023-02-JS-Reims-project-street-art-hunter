const AbstractManager = require("./AbstractManager");

class StreetArtManager extends AbstractManager {
  constructor() {
    super({ table: "streetArt" });
  }

  insert(streetArt) {
    return this.database.query(
      `insert into ${this.table} (name, image, x, y, isValid, score) values (?, ?, ?, ?, ?, ?)`,
      [
        streetArt.name,
        streetArt.image,
        streetArt.x,
        streetArt.y,
        streetArt.isValid,
        streetArt.score,
      ]
    );
  }

  update(streetArt) {
    return this.database.query(
      `update ${this.table} set name = ?, image = ?, x= ?, y= ?, isValid= ?, score= ? where id = ?`,
      [
        streetArt.name,
        streetArt.image,
        streetArt.x,
        streetArt.y,
        streetArt.isValid,
        streetArt.score,
        streetArt.id,
      ]
    );
  }
}

module.exports = StreetArtManager;
