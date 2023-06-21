const AbstractManager = require("./AbstractManager");

class GalleryManager extends AbstractManager {
  constructor() {
    super({ table: "gallery" });
  }

  insert(gallery) {
    return this.database.query(
      `insert into ${this.table} (id_user, id_street_art, image) values (?, ?, ?)`,
      [gallery.id, gallery.id_street_art, gallery.imgURL]
    );
  }

  update(gallery) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [gallery.title, gallery.id]
    );
  }
}

module.exports = GalleryManager;
