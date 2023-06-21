const AbstractManager = require("./AbstractManager");

class ArtistManager extends AbstractManager {
  constructor() {
    super({ table: "artist" });
  }

  insert(artist) {
    return this.database.query(
      `insert into ${this.table} (name, bio) values (?, ?)`,
      [artist.name, artist.bio]
    );
  }

  update(artist) {
    return this.database.query(
      `update ${this.table} set name = ?, bio = ? where id = ?`,
      [artist.name, artist.bio, artist.id]
    );
  }
}

module.exports = ArtistManager;
